"use client";

import { useEffect, useRef } from "react";

export function EdgarasDotMatrixInteractive({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = "100%";
    svg.style.height = "auto";

    const vb = svg.getAttribute("viewBox")?.split(" ").map(Number);
    const vbW = vb?.[2] ?? 1616;
    const vbH = vb?.[3] ?? 184;

    const circles = Array.from(svg.querySelectorAll("circle"));
    const data = circles.map((c) => {
      const el = c as SVGElement;
      el.style.transformBox = "fill-box";
      el.style.transformOrigin = "center";
      el.style.transition =
        "transform 0.4s ease-out, fill-opacity 0.5s ease-out";
      return {
        el,
        cx: Number.parseFloat(c.getAttribute("cx") || "0"),
        cy: Number.parseFloat(c.getAttribute("cy") || "0"),
      };
    });

    const RADIUS = 300;
    let rafId: number | null = null;

    const update = (mouseX: number, mouseY: number, scale: number) => {
      for (const { el, cx, cy } of data) {
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS && dist > 0.1) {
          const t = Math.pow(1 - dist / RADIUS, 2.5);

          const pushStrength = t * 8;
          const nx = dx / dist;
          const ny = dy / dist;
          const pushCssX = nx * pushStrength * scale;
          const pushCssY = ny * pushStrength * scale;

          const s = 1 - t * 0.55;
          const opacity = 0.03 + t * 0.35;

          el.style.transform = `translate(${pushCssX}px, ${pushCssY}px) scale(${s})`;
          el.style.fillOpacity = String(opacity);
        } else {
          el.style.transform = "";
          el.style.fillOpacity = "";
        }
      }
    };

    const reset = () => {
      for (const { el } of data) {
        el.style.transform = "";
        el.style.fillOpacity = "";
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = svg.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * vbW;
        const my = ((e.clientY - rect.top) / rect.height) * vbH;
        const scaleFactor = rect.width / vbW;
        update(mx, my, scaleFactor);
      });
    };

    const onMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      reset();
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1616px] [&_svg]:w-full [&_svg]:h-auto"
    >
      {children}
    </div>
  );
}
