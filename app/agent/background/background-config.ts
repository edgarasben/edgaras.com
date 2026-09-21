export type AgentBackgroundConfig = {
  layerCount: number
  horizon: number
  horizonGlow: number
  horizonSpread: number
  spacing: number
  amplitude: number
  frequency: number
  distortion: number
  depthFade: number
  foregroundSoftness: number
  rimLight: number
  exposure: number
  speed: number
  waveSpeed: number
  noiseSpeed: number
  pointerStrength: number
  maxDpr: number
  background: string
  highlight: string
  midLight: string
  foregroundTint: string
}

export const defaultBackgroundConfig: AgentBackgroundConfig = {
  layerCount: 7,
  horizon: 0.59,
  horizonGlow: 0.72,
  horizonSpread: 0.2,
  spacing: 0.075,
  amplitude: 0.095,
  frequency: 1.45,
  distortion: 0.32,
  depthFade: 0.68,
  foregroundSoftness: 0.72,
  rimLight: 0.52,
  exposure: 1.0,
  speed: 0.045,
  waveSpeed: 0.055,
  noiseSpeed: 0.018,
  pointerStrength: 0.11,
  maxDpr: 1.5,
  background: "#07090d",
  highlight: "#91a7ff",
  midLight: "#34446e",
  foregroundTint: "#0b0e15",
}
