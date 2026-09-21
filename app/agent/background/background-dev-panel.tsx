"use client"

import { Check, Copy, Dices, Palette, RotateCcw, SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"
import {
  randomizeBackgroundPalette,
  randomizeBackgroundScene,
  type AgentBackgroundConfig,
} from "./background-config"

type NumericKey = {
  [K in keyof AgentBackgroundConfig]: AgentBackgroundConfig[K] extends number
    ? K
    : never
}[keyof AgentBackgroundConfig]

type Control = {
  key: NumericKey
  label: string
  min: number
  max: number
  step: number
}

const controls: Array<{ title: string; items: Control[] }> = [
  {
    title: "Scene",
    items: [
      { key: "layerCount", label: "Layers", min: 3, max: 8, step: 1 },
      { key: "horizon", label: "Horizon", min: 0.42, max: 0.72, step: 0.005 },
      { key: "spacing", label: "Depth spacing", min: 0.035, max: 0.13, step: 0.005 },
      { key: "amplitude", label: "Amplitude", min: 0.025, max: 0.2, step: 0.005 },
      { key: "frequency", label: "Frequency", min: 0.5, max: 3, step: 0.05 },
      { key: "distortion", label: "Distortion", min: 0, max: 0.8, step: 0.01 },
      { key: "perspective", label: "Perspective", min: 0.5, max: 1.7, step: 0.02 },
    ],
  },
  {
    title: "Light & depth",
    items: [
      { key: "horizonGlow", label: "Horizon glow", min: 0, max: 1.5, step: 0.02 },
      { key: "horizonSpread", label: "Glow spread", min: 0.06, max: 0.4, step: 0.01 },
      { key: "rimLight", label: "Rim light", min: 0, max: 1.5, step: 0.02 },
      { key: "specularStrength", label: "Reflections", min: 0, max: 1.6, step: 0.02 },
      { key: "specularSharpness", label: "Reflection focus", min: 4, max: 28, step: 0.5 },
      { key: "lightSpread", label: "Light spread", min: 0.15, max: 1, step: 0.01 },
      { key: "lineStrength", label: "Contour lines", min: 0, max: 0.8, step: 0.01 },
      { key: "lineDensity", label: "Line density", min: 2, max: 16, step: 0.5 },
      { key: "lineWidth", label: "Line width", min: 0.03, max: 0.18, step: 0.005 },
      { key: "grain", label: "Dither", min: 0, max: 1.2, step: 0.02 },
      { key: "depthFade", label: "Depth fade", min: 0.1, max: 1.2, step: 0.02 },
      { key: "foregroundSoftness", label: "Foreground blur", min: 0.05, max: 1.5, step: 0.02 },
      { key: "exposure", label: "Exposure", min: 0.5, max: 1.8, step: 0.02 },
    ],
  },
  {
    title: "Motion",
    items: [
      { key: "speed", label: "Global speed", min: 0, max: 0.14, step: 0.005 },
      { key: "waveSpeed", label: "Wave speed", min: 0, max: 0.16, step: 0.005 },
      { key: "noiseSpeed", label: "Noise speed", min: 0, max: 0.08, step: 0.002 },
      { key: "pointerStrength", label: "Pointer", min: 0, max: 0.3, step: 0.01 },
      { key: "maxDpr", label: "Max DPR", min: 0.75, max: 2, step: 0.25 },
    ],
  },
]

const colorControls: Array<{
  key: "background" | "highlight" | "midLight" | "foregroundTint" | "lightBackground" | "lightHighlight" | "lightMidLight" | "lightForegroundTint"
  label: string
}> = [
  { key: "background", label: "Background" },
  { key: "highlight", label: "Highlight" },
  { key: "midLight", label: "Mid light" },
  { key: "foregroundTint", label: "Dark foreground" },
  { key: "lightBackground", label: "Light background" },
  { key: "lightHighlight", label: "Light highlight" },
  { key: "lightMidLight", label: "Light mid" },
  { key: "lightForegroundTint", label: "Light foreground" },
]

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")
}

export function BackgroundDevPanel({
  value,
  onChange,
  onReset,
}: {
  value: AgentBackgroundConfig
  onChange: (next: AgentBackgroundConfig) => void
  onReset: () => void
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const updateNumber = (key: NumericKey, next: number) => {
    onChange({ ...value, [key]: next })
  }

  const copyConfig = async () => {
    const text = `export const backgroundConfig = ${JSON.stringify(value, null, 2)} as const`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 font-body text-foreground">
      {open ? (
        <div className="mb-2 w-[min(22rem,calc(100vw-2rem))] max-h-[min(70vh,46rem)] overflow-hidden rounded-2xl border border-white/10 bg-black/75 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Depth background</p>
              <p className="mt-0.5 text-[11px] text-white/45">Live shader controls</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close background controls"
              className="rounded-full p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[calc(min(70vh,46rem)-7.5rem)] overflow-y-auto px-4 py-3">
            <div className="mb-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => onChange(randomizeBackgroundPalette(value))} className="flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.07] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.12] hover:text-white">
                <Palette className="size-3.5" /> Palette
              </button>
              <button type="button" onClick={() => onChange(randomizeBackgroundScene(value))} className="flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.07] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.12] hover:text-white">
                <Dices className="size-3.5" /> Remix scene
              </button>
            </div>
            {controls.map((section) => (
              <div key={section.title} className="mb-5 last:mb-2">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                  {section.title}
                </p>
                <div className="space-y-3">
                  {section.items.map((control) => (
                    <label key={control.key} className="block">
                      <span className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                        <span className="text-white/65">{control.label}</span>
                        <span className="font-mono text-[10px] tabular-nums text-white/40">
                          {formatValue(value[control.key])}
                        </span>
                      </span>
                      <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={value[control.key]}
                        onChange={(event) =>
                          updateNumber(control.key, Number(event.target.value))
                        }
                        className="h-1 w-full cursor-pointer accent-white"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                Color
              </p>
              <div className="grid grid-cols-2 gap-2">
                {colorControls.map((control) => (
                  <label
                    key={control.key}
                    className="flex items-center gap-2 rounded-xl bg-white/[0.055] px-2.5 py-2"
                  >
                    <input
                      type="color"
                      value={value[control.key]}
                      onChange={(event) =>
                        onChange({ ...value, [control.key]: event.target.value })
                      }
                      className="size-6 cursor-pointer rounded-md border-0 bg-transparent p-0"
                    />
                    <span className="text-[11px] text-white/60">{control.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t border-white/10 p-3">
            <button
              type="button"
              onClick={onReset}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/[0.07] px-3 py-2 text-xs text-white/65 transition hover:bg-white/[0.12] hover:text-white"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => void copyConfig()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-white/90"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy config"}
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open background controls"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs text-white/60 shadow-lg backdrop-blur-xl transition hover:bg-black/75 hover:text-white"
      >
        <SlidersHorizontal className="size-3.5" />
        BG
      </button>
    </div>
  )
}
