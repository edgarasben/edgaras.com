export type AgentBackgroundConfig = {
  layerCount: number
  horizon: number
  horizonGlow: number
  horizonSpread: number
  spacing: number
  amplitude: number
  frequency: number
  distortion: number
  perspective: number
  depthFade: number
  foregroundSoftness: number
  rimLight: number
  specularStrength: number
  specularSharpness: number
  lightSpread: number
  lineStrength: number
  lineDensity: number
  lineWidth: number
  grain: number
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
  lightBackground: string
  lightHighlight: string
  lightMidLight: string
  lightForegroundTint: string
}

export const defaultBackgroundConfig: AgentBackgroundConfig = {
  layerCount: 7,
  horizon: 0.59,
  horizonGlow: 0.7,
  horizonSpread: 0.2,
  spacing: 0.072,
  amplitude: 0.11,
  frequency: 1.25,
  distortion: 0.38,
  perspective: 1.08,
  depthFade: 0.66,
  foregroundSoftness: 0.58,
  rimLight: 0.64,
  specularStrength: 0.92,
  specularSharpness: 13,
  lightSpread: 0.56,
  lineStrength: 0.38,
  lineDensity: 8,
  lineWidth: 0.09,
  grain: 0.72,
  exposure: 1,
  speed: 0.042,
  waveSpeed: 0.052,
  noiseSpeed: 0.017,
  pointerStrength: 0.11,
  maxDpr: 1.5,
  background: "#06080d",
  highlight: "#88a8ff",
  midLight: "#293b68",
  foregroundTint: "#090c13",
  lightBackground: "#f7f8fc",
  lightHighlight: "#6f88d8",
  lightMidLight: "#c8d2ee",
  lightForegroundTint: "#e7ebf5",
}

type Palette = Pick<
  AgentBackgroundConfig,
  | "background"
  | "highlight"
  | "midLight"
  | "foregroundTint"
  | "lightBackground"
  | "lightHighlight"
  | "lightMidLight"
  | "lightForegroundTint"
>

export const backgroundPalettes: Palette[] = [
  {
    background: "#06080d",
    highlight: "#88a8ff",
    midLight: "#293b68",
    foregroundTint: "#090c13",
    lightBackground: "#f7f8fc",
    lightHighlight: "#6f88d8",
    lightMidLight: "#c8d2ee",
    lightForegroundTint: "#e7ebf5",
  },
  {
    background: "#08070d",
    highlight: "#b091ff",
    midLight: "#463267",
    foregroundTint: "#0e0a15",
    lightBackground: "#faf8fd",
    lightHighlight: "#8d72ce",
    lightMidLight: "#dccff0",
    lightForegroundTint: "#eee8f5",
  },
  {
    background: "#050a0c",
    highlight: "#77d6d1",
    midLight: "#24545a",
    foregroundTint: "#071113",
    lightBackground: "#f5faf9",
    lightHighlight: "#4a9f9d",
    lightMidLight: "#c3e3df",
    lightForegroundTint: "#e4f1ef",
  },
  {
    background: "#090806",
    highlight: "#f1bc78",
    midLight: "#67452d",
    foregroundTint: "#120e09",
    lightBackground: "#fcfaf6",
    lightHighlight: "#c28b51",
    lightMidLight: "#ead5b9",
    lightForegroundTint: "#f3eadf",
  },
  {
    background: "#0a0709",
    highlight: "#f18fae",
    midLight: "#683345",
    foregroundTint: "#130a0e",
    lightBackground: "#fdf8fa",
    lightHighlight: "#c46b88",
    lightMidLight: "#eccbd6",
    lightForegroundTint: "#f5e7ec",
  },
  {
    background: "#07090b",
    highlight: "#c7d1df",
    midLight: "#3a4657",
    foregroundTint: "#0a0d11",
    lightBackground: "#f8f9fa",
    lightHighlight: "#7c899a",
    lightMidLight: "#d5dbe3",
    lightForegroundTint: "#eceff3",
  },
]

type SceneRecipe = Pick<
  AgentBackgroundConfig,
  | "layerCount"
  | "horizon"
  | "spacing"
  | "amplitude"
  | "frequency"
  | "distortion"
  | "perspective"
  | "depthFade"
  | "foregroundSoftness"
  | "rimLight"
  | "specularStrength"
  | "specularSharpness"
  | "lightSpread"
  | "lineStrength"
  | "lineDensity"
  | "lineWidth"
>

const sceneRecipes: SceneRecipe[] = [
  {
    layerCount: 7,
    horizon: 0.58,
    spacing: 0.068,
    amplitude: 0.115,
    frequency: 1.18,
    distortion: 0.44,
    perspective: 1.12,
    depthFade: 0.64,
    foregroundSoftness: 0.56,
    rimLight: 0.7,
    specularStrength: 1,
    specularSharpness: 14,
    lightSpread: 0.5,
    lineStrength: 0.42,
    lineDensity: 9,
    lineWidth: 0.08,
  },
  {
    layerCount: 6,
    horizon: 0.62,
    spacing: 0.086,
    amplitude: 0.14,
    frequency: 0.86,
    distortion: 0.28,
    perspective: 1.28,
    depthFade: 0.74,
    foregroundSoftness: 0.76,
    rimLight: 0.52,
    specularStrength: 1.12,
    specularSharpness: 18,
    lightSpread: 0.68,
    lineStrength: 0.28,
    lineDensity: 7,
    lineWidth: 0.1,
  },
  {
    layerCount: 8,
    horizon: 0.55,
    spacing: 0.057,
    amplitude: 0.078,
    frequency: 1.72,
    distortion: 0.52,
    perspective: 0.94,
    depthFade: 0.58,
    foregroundSoftness: 0.46,
    rimLight: 0.82,
    specularStrength: 0.78,
    specularSharpness: 11,
    lightSpread: 0.44,
    lineStrength: 0.55,
    lineDensity: 12,
    lineWidth: 0.065,
  },
  {
    layerCount: 7,
    horizon: 0.6,
    spacing: 0.078,
    amplitude: 0.098,
    frequency: 1.38,
    distortion: 0.2,
    perspective: 1.38,
    depthFade: 0.8,
    foregroundSoftness: 0.88,
    rimLight: 0.48,
    specularStrength: 1.2,
    specularSharpness: 21,
    lightSpread: 0.78,
    lineStrength: 0.22,
    lineDensity: 6,
    lineWidth: 0.12,
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function jitter(value: number, amount: number, min: number, max: number) {
  return clamp(value + (Math.random() * 2 - 1) * amount, min, max)
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

export function randomizeBackgroundPalette(
  current: AgentBackgroundConfig,
): AgentBackgroundConfig {
  const alternatives = backgroundPalettes.filter(
    (palette) => palette.highlight !== current.highlight,
  )
  const palette = pick(alternatives.length ? alternatives : backgroundPalettes)
  return { ...current, ...palette }
}

export function randomizeBackgroundScene(
  current: AgentBackgroundConfig,
): AgentBackgroundConfig {
  const recipe = pick(sceneRecipes)
  const palette = pick(backgroundPalettes)
  const perspective = jitter(recipe.perspective, 0.12, 0.78, 1.5)

  return {
    ...current,
    ...palette,
    layerCount: Math.round(jitter(recipe.layerCount, 1, 5, 8)),
    horizon: jitter(recipe.horizon, 0.025, 0.5, 0.66),
    horizonGlow: jitter(0.72, 0.18, 0.42, 1.08),
    horizonSpread: jitter(0.2, 0.05, 0.12, 0.3),
    spacing: jitter(recipe.spacing, 0.012, 0.045, 0.105),
    amplitude: jitter(recipe.amplitude, 0.022, 0.055, 0.17),
    frequency: jitter(recipe.frequency, 0.22, 0.68, 2.05),
    distortion: jitter(recipe.distortion, 0.1, 0.12, 0.68),
    perspective,
    depthFade: jitter(recipe.depthFade, 0.1, 0.42, 0.92),
    foregroundSoftness: jitter(recipe.foregroundSoftness, 0.14, 0.32, 1.05),
    rimLight: jitter(recipe.rimLight, 0.14, 0.32, 1.05),
    specularStrength: jitter(recipe.specularStrength, 0.2, 0.5, 1.4),
    specularSharpness: jitter(recipe.specularSharpness, 3.5, 8, 25),
    lightSpread: jitter(recipe.lightSpread, 0.12, 0.32, 0.9),
    lineStrength: jitter(recipe.lineStrength, 0.12, 0.08, 0.7),
    lineDensity: jitter(recipe.lineDensity, 2, 4, 14),
    lineWidth: jitter(recipe.lineWidth, 0.025, 0.045, 0.15),
    grain: jitter(0.68, 0.2, 0.3, 1),
    exposure: jitter(1, 0.08, 0.86, 1.14),
    speed: jitter(0.042, 0.014, 0.018, 0.068),
    waveSpeed: jitter(0.052, 0.016, 0.025, 0.082),
    noiseSpeed: jitter(0.017, 0.007, 0.006, 0.032),
    pointerStrength: jitter(0.11, 0.035, 0.05, 0.17),
  }
}
