"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  defaultBackgroundConfig,
  type AgentBackgroundConfig,
} from "./background-config"
import { BackgroundDevPanel } from "./background-dev-panel"

const VERTEX_SHADER = \`#version 300 es
precision highp float;

in vec2 a_grid;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_layerCount;
uniform float u_horizon;
uniform float u_spacing;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_distortion;
uniform float u_perspective;
uniform float u_speed;
uniform float u_waveSpeed;
uniform float u_noiseSpeed;
uniform float u_pointerStrength;

out float v_depth;
out float v_height;
out vec3 v_normal;
out vec2 v_grid;
out vec2 v_world;

float heightAt(vec2 p) {
  float t = u_time * u_speed;
  float bands = 5.0 + u_layerCount * 0.72;
  float broad = sin(p.x * u_frequency * 2.3 + p.y * bands - t * u_waveSpeed * 18.0);
  float crossing = sin(p.x * u_frequency * 4.1 - p.y * (bands * 1.34) + t * u_noiseSpeed * 36.0) * 0.38;
  float swell = sin((p.x * 0.72 + p.y * 1.35) * u_frequency * 2.0 - t * 0.72) * 0.52;
  float detail = sin(p.x * u_frequency * 8.2 + p.y * 13.0 + t * 0.44) * 0.14 * u_distortion;
  return (broad + crossing + swell + detail) / 1.9;
}

void main() {
  float depth = a_grid.y;
  float depthCurve = pow(depth, max(u_perspective, 0.3));
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 world = vec2(a_grid.x * max(aspect, 1.0), depth);
  float height = heightAt(world);

  float e = 0.008;
  float hx = heightAt(world + vec2(e, 0.0));
  float hz = heightAt(world + vec2(0.0, e));
  vec3 normal = normalize(vec3(-(hx - height) * u_amplitude / e, 1.0, -(hz - height) * u_amplitude / e));

  float horizonY = mix(-0.55, 0.55, u_horizon);
  float baseY = mix(-1.3, horizonY, depthCurve);
  float heightScale = u_amplitude * mix(1.75, 0.3, depthCurve);
  float perspectiveWidth = mix(1.46, 0.62, depthCurve);
  float parallax = mix(1.0, 0.08, depthCurve) * u_pointerStrength;

  float screenX = a_grid.x * perspectiveWidth + u_pointer.x * parallax * 0.16;
  float screenY = baseY + height * heightScale + u_pointer.y * parallax * 0.07;
  float clipDepth = mix(-0.82, 0.82, depthCurve);

  v_depth = depthCurve;
  v_height = height;
  v_normal = normal;
  v_grid = a_grid;
  v_world = world;
  gl_Position = vec4(screenX, screenY, clipDepth, 1.0);
}
\`

const FRAGMENT_SHADER = \`#version 300 es
precision highp float;

in float v_depth;
in float v_height;
in vec3 v_normal;
in vec2 v_grid;
in vec2 v_world;
out vec4 outColor;

uniform float u_time;
uniform float u_horizonGlow;
uniform float u_horizonSpread;
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
uniform vec3 u_background;
uniform vec3 u_highlight;
uniform vec3 u_midLight;
uniform vec3 u_foregroundTint;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float crispLine(float cell, float width) {
  float aa = max(fwidth(cell) * 0.42, 0.001);
  return 1.0 - smoothstep(width, width + aa, cell);
}

void main() {
  vec3 n = normalize(v_normal);
  vec3 lightDir = normalize(vec3(-0.34, 0.82, 0.46));
  float diffuse = max(dot(n, lightDir), 0.0);
  float facing = pow(max(dot(n, normalize(vec3(0.0, 0.75, 1.0))), 0.0), 2.0);
  float rim = pow(1.0 - clamp(n.y, 0.0, 1.0), 2.25) * u_rimLight;

  float glintCenter = sin(u_time * 0.045) * 0.74;
  float glintDistance = (v_world.x - glintCenter) / max(u_lightSpread, 0.08);
  float glintMask = exp(-glintDistance * glintDistance * u_specularSharpness * 0.1);
  float specular = pow(max(dot(reflect(-lightDir, n), vec3(0.0, 0.72, 0.69)), 0.0), max(u_specularSharpness, 2.0));
  specular *= glintMask * u_specularStrength;

  vec3 nearColor = mix(u_foregroundTint, u_midLight, 0.16 + diffuse * 0.22);
  vec3 farColor = mix(u_midLight, u_highlight, 0.22 + diffuse * 0.32);
  vec3 surface = mix(nearColor, farColor, pow(v_depth, 0.78));
  surface *= mix(0.58, 1.08, diffuse);
  surface += u_highlight * (specular * 0.72 + rim * 0.09 + facing * 0.04);

  float depthCell = abs(fract(v_grid.y * u_lineDensity) - 0.5);
  float contourCell = abs(fract((v_height + 1.0) * u_lineDensity * 0.56) - 0.5);
  float longitudinalCell = abs(fract((v_grid.x + 1.0) * u_lineDensity * 0.28) - 0.5);
  float lineWidth = u_lineWidth * 0.72;
  float depthLine = crispLine(depthCell, lineWidth);
  float contourLine = crispLine(contourCell, lineWidth * 0.72);
  float longitudinalLine = crispLine(longitudinalCell, lineWidth * 0.5);
  float meshLine = max(depthLine, max(contourLine * 0.82, longitudinalLine * 0.42));

  // Lines are solid surface coloration, never translucent overlays.
  vec3 lineColor = mix(u_foregroundTint, u_highlight, mix(0.34, 0.72, v_depth));
  surface = mix(surface, lineColor, clamp(meshLine * u_lineStrength, 0.0, 0.88));

  float horizonHaze = exp(-(1.0 - v_depth) / max(u_horizonSpread, 0.025)) * u_horizonGlow;
  surface = mix(surface, mix(u_midLight, u_highlight, 0.36), horizonHaze * 0.24);
  float fog = pow(v_depth, 2.4) * u_depthFade * 0.44;
  surface = mix(surface, mix(u_background, u_midLight, 0.18), fog);

  surface *= mix(0.88, 1.02, u_lightMode);
  surface *= u_exposure;
  vec3 darkMapped = pow(surface / (surface + vec3(0.88)), vec3(0.92));
  vec3 lightMapped = pow(clamp(surface, 0.0, 1.0), vec3(0.98));
  vec3 color = mix(darkMapped, lightMapped, u_lightMode);
  float dither = (hash21(gl_FragCoord.xy + fract(u_time) * 71.3) - 0.5) / 255.0;
  color += dither * u_grain;

  outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
\`

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
      antialias: true,
      depth: true,
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

    const columns = 128
    const rows = 72
    const vertices = new Float32Array((columns + 1) * (rows + 1) * 2)
    let vertexOffset = 0
    for (let row = 0; row <= rows; row++) {
      for (let column = 0; column <= columns; column++) {
        vertices[vertexOffset++] = (column / columns) * 2 - 1
        vertices[vertexOffset++] = row / rows
      }
    }

    const indices = new Uint32Array(columns * rows * 6)
    let indexOffset = 0
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const a = row * (columns + 1) + column
        const b = a + 1
        const c = a + columns + 1
        const d = c + 1
        indices[indexOffset++] = a
        indices[indexOffset++] = c
        indices[indexOffset++] = b
        indices[indexOffset++] = b
        indices[indexOffset++] = c
        indices[indexOffset++] = d
      }
    }

    const vertexBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "a_grid")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

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

      gl.clearColor(background[0], background[1], background[2], 1)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0)
      frame = requestAnimationFrame(render)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      gl.deleteBuffer(vertexBuffer)
      gl.deleteBuffer(indexBuffer)
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
