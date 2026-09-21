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
uniform float u_depthFade;
uniform float u_foregroundSoftness;
uniform float u_rimLight;
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
    float perspective = mix(0.38, 1.2, depth);
    float freq = u_frequency * mix(0.82, 1.35, far);
    float speed = u_waveSpeed * mix(0.45, 1.35, far);

    float nx = p.x * freq * perspective + fi * 6.731;
    float distortion = fbm(vec2(nx * 0.42, fi * 1.73 + t * u_noiseSpeed * 7.0));
    float wave = sin(nx * 1.25 + t * speed * 10.0 + fi * 1.61);
    wave += 0.48 * sin(nx * 2.1 - t * speed * 6.0 + fi * 2.7);
    wave += (distortion - 0.5) * 2.0 * u_distortion;

    float layerAmp = u_amplitude * mix(0.58, 1.2, depth);
    float y = baseY + wave * layerAmp;

    float signedDist = p.y - y;
    float softness = mix(0.007, 0.045 * max(u_foregroundSoftness, 0.05), depth);
    float body = 1.0 - smoothstep(-softness, softness * 1.4, signedDist);
    float ridge = exp(-abs(signedDist) / max(softness * 0.7, 0.002));

    float fade = mix(1.0, 0.34, depth * u_depthFade);
    float centerLight = exp(-abs(p.x) * mix(0.28, 0.7, depth));
    float ridgeLight = ridge * u_rimLight * far * (0.55 + 0.45 * centerLight);

    vec3 layerColor = hexLayerColor(depth);
    vec3 bodyColor = layerColor * mix(0.16, 0.52, far);

    color = mix(color, bodyColor, body * fade * mix(0.34, 0.86, depth));
    color += u_highlight * ridgeLight * 0.22 * fade;
  }

  float centerBloom = exp(-length(vec2(p.x * 0.75, (p.y - horizonY) * 1.7)) * 1.6);
  color += u_highlight * centerBloom * 0.06 * u_horizonGlow;

  color *= mix(0.72, 1.0, vignette);
  color *= u_exposure;
  color = color / (color + vec3(0.92));
  color = pow(color, vec3(0.92));

  outColor = vec4(color, 1.0);
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

  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const cssFallback = useMemo(() => {
    return {
      background: `radial-gradient(70% 45% at 50% 58%, ${config.midLight}33 0%, transparent 70%), linear-gradient(${config.background}, ${config.background})`,
    }
  }, [config.background, config.midLight])

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
      depthFade: gl.getUniformLocation(program, "u_depthFade"),
      foregroundSoftness: gl.getUniformLocation(program, "u_foregroundSoftness"),
      rimLight: gl.getUniformLocation(program, "u_rimLight"),
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
      gl.uniform1f(uniforms.depthFade, cfg.depthFade)
      gl.uniform1f(uniforms.foregroundSoftness, cfg.foregroundSoftness)
      gl.uniform1f(uniforms.rimLight, cfg.rimLight)
      gl.uniform1f(uniforms.exposure, cfg.exposure)
      gl.uniform1f(uniforms.speed, cfg.speed)
      gl.uniform1f(uniforms.waveSpeed, cfg.waveSpeed)
      gl.uniform1f(uniforms.noiseSpeed, cfg.noiseSpeed)
      gl.uniform1f(uniforms.pointerStrength, reducedMotion ? 0 : cfg.pointerStrength)

      const background = hexToRgb(cfg.background)
      const highlight = hexToRgb(cfg.highlight)
      const midLight = hexToRgb(cfg.midLight)
      const foregroundTint = hexToRgb(cfg.foregroundTint)
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
  }, [visible, reducedMotion])

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
