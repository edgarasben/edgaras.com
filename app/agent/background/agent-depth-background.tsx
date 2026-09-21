"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  defaultBackgroundConfig,
  type AgentBackgroundConfig,
} from "./background-config"
import { BackgroundDevPanel } from "./background-dev-panel"

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_layerCount;
uniform float u_horizon;
uniform float u_horizonGlow;
uniform float u_horizonSpread;
uniform float u_spacing;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_distortion;
uniform float u_perspective;
uniform float u_depthFade;
uniform float u_foregroundSoftness;
uniform float u_rimLight;
uniform float u_specularStrength;
uniform float u_specularSharpness;
uniform float u_lightSpread;
uniform float u_lineStrength;
uniform float u_lineDensity;
uniform float u_lineWidth;
uniform float u_grain;
uniform float u_lightMode;
uniform float u_exposure;
uniform float u_speed;
uniform float u_waveSpeed;
uniform float u_noiseSpeed;
uniform float u_pointerStrength;
uniform vec3 u_background;
uniform vec3 u_highlight;
uniform vec3 u_midLight;
uniform vec3 u_foregroundTint;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + 17.13;
    amplitude *= 0.5;
  }
  return value;
}

vec3 hexLayerColor(float depth) {
  vec3 farColor = mix(u_midLight, u_highlight, pow(1.0 - depth, 1.8));
  vec3 nearColor = mix(u_foregroundTint, u_midLight, 0.24);
  return mix(farColor, nearColor, depth);
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);

  vec2 pointer = u_pointer * u_pointerStrength;
  p.x += pointer.x * 0.18;
  p.y += pointer.y * 0.08;

  float t = u_time * u_speed;
  vec3 color = u_background;

  float horizonY = mix(-0.55, 0.55, u_horizon);
  float glowDist = abs(p.y - horizonY);
  float glow = exp(-glowDist / max(u_horizonSpread, 0.001)) * u_horizonGlow;
  glow *= smoothstep(1.8, 0.15, abs(p.x) * 0.45);
  color += u_midLight * glow * 0.18;

  float vignette = smoothstep(1.55, 0.22, length(vec2(p.x * 0.7, p.y * 0.95)));

  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_layerCount) break;

    float fi = float(i);
    float denom = max(u_layerCount - 1.0, 1.0);
    float depth = fi / denom;
    float far = 1.0 - depth;

    float baseY = horizonY - fi * u_spacing + 0.06;
    float depthCurve = pow(depth, max(u_perspective, 0.25));
    float projection = mix(0.42, 1.34, depthCurve);
    float freq = u_frequency * mix(1.52, 0.76, depthCurve);
    float speed = u_waveSpeed * mix(0.52, 1.12, depthCurve);
    float layerParallax = mix(0.08, 1.0, depthCurve);
    float layerX = p.x + pointer.x * 0.16 * layerParallax;
    float layerY = p.y + pointer.y * 0.07 * layerParallax;

    float nx = layerX * freq * projection + fi * 6.731;
    float distortion = fbm(vec2(nx * 0.42, fi * 1.73 + t * u_noiseSpeed * 7.0));
    float wave = sin(nx * 1.25 + t * speed * 10.0 + fi * 1.61);
    wave += 0.48 * sin(nx * 2.1 - t * speed * 6.0 + fi * 2.7);
    wave += (distortion - 0.5) * 2.0 * u_distortion;

    float layerAmp = u_amplitude * mix(0.42, 1.32, depthCurve);
    float y = baseY + wave * layerAmp;
    float signedDist = layerY - y;
    float pixel = fwidth(signedDist);
    float softness = mix(pixel * 1.1, 0.052 * max(u_foregroundSoftness, 0.05), depthCurve);
    float body = 1.0 - smoothstep(-softness, softness * 1.35, signedDist);

    // Perspective-linked ridge width: hairline at the horizon, broad nearby.
    float rimWidth = mix(max(pixel * 1.15, 0.0012), max(softness * 0.82, 0.003), depthCurve);
    float ridge = exp(-abs(signedDist) / rimWidth);
    float fade = mix(1.0, 0.38, depthCurve * u_depthFade);
    float centerLight = exp(-abs(layerX) * mix(0.32, 0.78, depthCurve));
    float ridgeLight = ridge * u_rimLight * mix(0.54, 1.0, depthCurve);
    ridgeLight *= 0.5 + 0.5 * centerLight;

    float glintCenter = sin(t * (0.45 + fi * 0.035) + fi * 2.17) * 0.72;
    float glintDistance = (layerX - glintCenter) / max(u_lightSpread, 0.08);
    float glintMask = exp(-glintDistance * glintDistance * u_specularSharpness * 0.12);
    float microFacet = 0.58 + 0.42 * noise(vec2(nx * 1.7, fi * 8.3));
    float specular = ridge * glintMask * microFacet * u_specularStrength;
    specular *= mix(0.72, 1.0, far);

    float lineScale = mix(1.45, 0.72, depthCurve);
    float linePhase = abs(signedDist) / max(layerAmp, 0.008) * u_lineDensity * lineScale;
    float lineCell = abs(fract(linePhase) - 0.5);
    // Use derivatives only for a narrow sub-pixel transition. The previous
    // version added them to the line width itself, causing visible softness.
    float lineAA = max(fwidth(linePhase) * 0.28, 0.0015);
    float contour = 1.0 - smoothstep(u_lineWidth, u_lineWidth + lineAA, lineCell);
    contour *= body * smoothstep(softness * 1.8, softness * 4.0, -signedDist);

    vec3 layerColor = hexLayerColor(depthCurve);
    vec3 bodyColor = mix(layerColor * mix(0.18, 0.56, far), layerColor, u_lightMode * 0.66);
    float bodyOpacity = body * fade * mix(0.3, 0.84, depthCurve);

    color = mix(color, bodyColor, bodyOpacity);
    color += mix(u_highlight, layerColor, 0.22) * ridgeLight * 0.2 * fade;
    color += u_highlight * specular * 0.34 * fade;
    color = mix(color, u_highlight, contour * u_lineStrength * mix(0.11, 0.055, depthCurve));
  }

  float centerBloom = exp(-length(vec2(p.x * 0.75, (p.y - horizonY) * 1.7)) * 1.6);
  color += u_highlight * centerBloom * 0.06 * u_horizonGlow;

  color *= mix(mix(0.72, 0.94, u_lightMode), 1.0, vignette);
  color *= u_exposure;
  vec3 darkMapped = pow(color / (color + vec3(0.92)), vec3(0.92));
  vec3 lightMapped = pow(clamp(color, 0.0, 1.0), vec3(0.98));
  color = mix(darkMapped, lightMapped, u_lightMode);
  float dither = (hash21(gl_FragCoord.xy + fract(u_time) * 91.7) - 0.5) / 255.0;
  color += dither * u_grain;
  outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

function hexToRgb(hex: string) {
  const value = hex.replace("#", "")
  const r = Number.parseInt(value.slice(0, 2), 16) / 255
  const g = Number.parseInt(value.slice(2, 4), 16) / 255
  const b = Number.parseInt(value.slice(4, 6), 16) / 255
  return [r, g, b] as const
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function AgentDepthBackground({
  visible,
}: {
  visible: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const configRef = useRef<AgentBackgroundConfig>(defaultBackgroundConfig)
  const [config, setConfig] = useState(defaultBackgroundConfig)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    const root = document.documentElement
    const updateTheme = () => setIsLight(!root.classList.contains("dark"))
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const cssFallback = useMemo(() => {
    return {
      background: `radial-gradient(70% 45% at 50% 58%, ${isLight ? config.lightMidLight : config.midLight}55 0%, transparent 70%), linear-gradient(${isLight ? config.lightBackground : config.background}, ${isLight ? config.lightBackground : config.background})`,
    }
  }, [config, isLight])

  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    })
    if (!gl) return

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertex || !fragment) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )

    const position = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      pointer: gl.getUniformLocation(program, "u_pointer"),
      layerCount: gl.getUniformLocation(program, "u_layerCount"),
      horizon: gl.getUniformLocation(program, "u_horizon"),
      horizonGlow: gl.getUniformLocation(program, "u_horizonGlow"),
      horizonSpread: gl.getUniformLocation(program, "u_horizonSpread"),
      spacing: gl.getUniformLocation(program, "u_spacing"),
      amplitude: gl.getUniformLocation(program, "u_amplitude"),
      frequency: gl.getUniformLocation(program, "u_frequency"),
      distortion: gl.getUniformLocation(program, "u_distortion"),
      perspective: gl.getUniformLocation(program, "u_perspective"),
      depthFade: gl.getUniformLocation(program, "u_depthFade"),
      foregroundSoftness: gl.getUniformLocation(program, "u_foregroundSoftness"),
      rimLight: gl.getUniformLocation(program, "u_rimLight"),
      specularStrength: gl.getUniformLocation(program, "u_specularStrength"),
      specularSharpness: gl.getUniformLocation(program, "u_specularSharpness"),
      lightSpread: gl.getUniformLocation(program, "u_lightSpread"),
      lineStrength: gl.getUniformLocation(program, "u_lineStrength"),
      lineDensity: gl.getUniformLocation(program, "u_lineDensity"),
      lineWidth: gl.getUniformLocation(program, "u_lineWidth"),
      grain: gl.getUniformLocation(program, "u_grain"),
      lightMode: gl.getUniformLocation(program, "u_lightMode"),
      exposure: gl.getUniformLocation(program, "u_exposure"),
      speed: gl.getUniformLocation(program, "u_speed"),
      waveSpeed: gl.getUniformLocation(program, "u_waveSpeed"),
      noiseSpeed: gl.getUniformLocation(program, "u_noiseSpeed"),
      pointerStrength: gl.getUniformLocation(program, "u_pointerStrength"),
      background: gl.getUniformLocation(program, "u_background"),
      highlight: gl.getUniformLocation(program, "u_highlight"),
      midLight: gl.getUniformLocation(program, "u_midLight"),
      foregroundTint: gl.getUniformLocation(program, "u_foregroundTint"),
    }

    let pointerTarget = { x: 0, y: 0 }
    let pointerCurrent = { x: 0, y: 0 }
    let frame = 0
    const start = performance.now()

    const resize = () => {
      const cfg = configRef.current
      const dpr = Math.min(window.devicePixelRatio || 1, cfg.maxDpr)
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      }
    }

    const render = (now: number) => {
      resize()
      const cfg = configRef.current
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.04
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.04

      gl.useProgram(program)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform1f(uniforms.time, reducedMotion ? 0 : (now - start) / 1000)
      gl.uniform2f(uniforms.pointer, pointerCurrent.x, pointerCurrent.y)
      gl.uniform1f(uniforms.layerCount, Math.round(cfg.layerCount))
      gl.uniform1f(uniforms.horizon, cfg.horizon)
      gl.uniform1f(uniforms.horizonGlow, cfg.horizonGlow)
      gl.uniform1f(uniforms.horizonSpread, cfg.horizonSpread)
      gl.uniform1f(uniforms.spacing, cfg.spacing)
      gl.uniform1f(uniforms.amplitude, cfg.amplitude)
      gl.uniform1f(uniforms.frequency, cfg.frequency)
      gl.uniform1f(uniforms.distortion, cfg.distortion)
      gl.uniform1f(uniforms.perspective, cfg.perspective)
      gl.uniform1f(uniforms.depthFade, cfg.depthFade)
      gl.uniform1f(uniforms.foregroundSoftness, cfg.foregroundSoftness)
      gl.uniform1f(uniforms.rimLight, cfg.rimLight)
      gl.uniform1f(uniforms.specularStrength, cfg.specularStrength)
      gl.uniform1f(uniforms.specularSharpness, cfg.specularSharpness)
      gl.uniform1f(uniforms.lightSpread, cfg.lightSpread)
      gl.uniform1f(uniforms.lineStrength, cfg.lineStrength)
      gl.uniform1f(uniforms.lineDensity, cfg.lineDensity)
      gl.uniform1f(uniforms.lineWidth, cfg.lineWidth)
      gl.uniform1f(uniforms.grain, cfg.grain)
      gl.uniform1f(uniforms.lightMode, isLight ? 1 : 0)
      gl.uniform1f(uniforms.exposure, cfg.exposure)
      gl.uniform1f(uniforms.speed, cfg.speed)
      gl.uniform1f(uniforms.waveSpeed, cfg.waveSpeed)
      gl.uniform1f(uniforms.noiseSpeed, cfg.noiseSpeed)
      gl.uniform1f(uniforms.pointerStrength, reducedMotion ? 0 : cfg.pointerStrength)

      const background = hexToRgb(isLight ? cfg.lightBackground : cfg.background)
      const highlight = hexToRgb(isLight ? cfg.lightHighlight : cfg.highlight)
      const midLight = hexToRgb(isLight ? cfg.lightMidLight : cfg.midLight)
      const foregroundTint = hexToRgb(isLight ? cfg.lightForegroundTint : cfg.foregroundTint)
      gl.uniform3f(uniforms.background, ...background)
      gl.uniform3f(uniforms.highlight, ...highlight)
      gl.uniform3f(uniforms.midLight, ...midLight)
      gl.uniform3f(uniforms.foregroundTint, ...foregroundTint)

      gl.drawArrays(gl.TRIANGLES, 0, 3)
      frame = requestAnimationFrame(render)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [visible, reducedMotion, isLight])

  if (!visible) return null

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700"
        style={cssFallback}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(34rem_22rem_at_50%_46%,rgba(255,255,255,0.045),transparent_70%)]" />
      </div>

      <BackgroundDevPanel
        value={config}
        onChange={setConfig}
        onReset={() => setConfig(defaultBackgroundConfig)}
      />
    </>
  )
}
