function roundToTwo(num: number) {
  return Number(num.toFixed(2))
}

export function hexToHsl(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)

  return `${h}deg ${s}% ${l}%`
}

export function hexaToHsla(hexa: string) {
  const normalize = (val: number, max: number, min: number) => {
    return (val - min) / (max - min)
  }

  const hexToAlpha = (alphaHexString: string) => {
    return Math.round(normalize(parseInt(alphaHexString, 16), 255, 0) * 100)
  }

  // Get alpha value (assuming it's the last two characters)
  const A = hexToAlpha(hexa.length === 9 ? hexa.slice(7, 9) : 'FF')

  // Get hex value
  const H = hexa.slice(0, 7)

  // Convert hex to RGB
  let r = 0
  let g = 0
  let b = 0

  if (H.length === 4) {
    r = parseInt('0x' + H[1] + H[1])
    g = parseInt('0x' + H[2] + H[2])
    b = parseInt('0x' + H[3] + H[3])
  } else if (H.length === 7) {
    r = parseInt('0x' + H[1] + H[2])
    g = parseInt('0x' + H[3] + H[4])
    b = parseInt('0x' + H[5] + H[6])
  }

  // Conversion to HSL
  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) {
    h = 0
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6
  } else if (cmax === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)

  if (h < 0) {
    h += 360
  }

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return `hsla(${h},${s}%,${l}%,${A}%)`
}

export function hslToPlain(hsl: string) {
  if (!hsl.startsWith('hsl(')) {
    return hsl
  }
  return hsl.replace('hsl(', '').replace(')', '').replaceAll(',', '')
}

export function hslaToHsl(hsla: string) {
  const values = hsla.match(/^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)%\)$/)

  if (!values) {
    return null // Return null if the input string does not match the expected format
  }

  return `hsl(${values[1]}, ${values[2]}%, ${values[3]}%)`
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  // Normalize RGB values to the range 0-1
  r /= 255
  g /= 255
  b /= 255

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin
  let h = 0,
    l = (cmax + cmin) / 2,
    s = 0

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    switch (cmax) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
    h = Math.round(h * 60)
  }

  // Convert saturation and lightness to percentages
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return [h, s, Math.round(l)]
}

export function hexToRgb(hex: string) {
  // Remove the hash at the start if it exists
  hex = hex.replace(/^#/, '')

  // If the hex is 3 characters long, convert it to 6 characters
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Parse the red, green, and blue values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return [r, g, b]
}

export function makeAlphaHsla(
  colorHex: string,
  backgroundHex: string,
  strength = 1
) {
  // Convert input HEXes to RGBs (arrays)
  const color = hexToRgb(colorHex)

  const surface = hexToRgb(
    backgroundHex === 'white'
      ? '#FFFFFF'
      : backgroundHex === 'black'
        ? '#000000'
        : backgroundHex
  )

  // Calculate alpha value per channel, pick the highest value
  const alphaPerChannel = color.map((channel, i) => {
    return [
      (channel - surface[i]) / (255 - surface[i]),
      (channel - surface[i]) / (0 - surface[i])
    ]
  })

  const alpha = roundToTwo(
    Math.max(
      ...alphaPerChannel
        .flat()
        .filter((value) => /^-?\d+\.?\d*$/.test(value.toString()))
    )
  )

  // Calculate new RGB values based on the alpha
  const alphaColor = color.map((channel, i) => {
    return Math.round((channel - surface[i] + surface[i] * alpha) / alpha)
  })

  // If no alpha color was found, return original, otherwise return alpha color
  if (alphaColor.includes(NaN)) {
    const hsl = rgbToHsl(color[0], color[1], color[2])
    return {
      h: hsl[0],
      s: Math.round(hsl[1] * strength),
      l: hsl[2],
      a: 1
    }
  } else {
    const hsl = rgbToHsl(alphaColor[0], alphaColor[1], alphaColor[2])
    return {
      h: hsl[0],
      s: Math.round(hsl[1] * strength),
      l: hsl[2],
      a: alpha
    }
  }
}

// Calculate fade colors
export function makeAlphaHslaString(color: string, backgroundColor: string) {
  const { h, s, l, a } = makeAlphaHsla(color, backgroundColor)
  return `${h}deg ${s}% ${l}% / ${a}`
}

// CSS variables (tokens) to be passed in to tailwind.config
export const tokens = {
  colors: {
    text: {
      neutral: {
        DEFAULT: 'hsl(var(--fg-neutral) / <alpha-value>)',
        fade: 'hsl(var(--fg-neutral-fade) / <alpha-value>)'
      },
      primary: 'hsl(var(--fg-primary) / <alpha-value>)',
      positive: 'hsl(var(--fg-positive) / <alpha-value>)',
      critical: 'hsl(var(--fg-critical) / <alpha-value>)',
      'on-neutral': 'hsl(var(--on-neutral) / <alpha-value>)',
      'on-primary': 'hsl(var(--on-primary) / <alpha-value>)',
      'on-critical': 'hsl(var(--on-critical) / <alpha-value>)',
      'on-warn': 'hsl(var(--on-warn) / <alpha-value>)',
      disable: 'hsl(var(--fg-disable) / <alpha-value>)',
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent'
    },
    border: {
      neutral: {
        DEFAULT: 'hsl(var(--border-neutral) / <alpha-value>)',
        fade: 'hsl(var(--border-neutral-fade))'
      },
      primary: 'hsl(var(--border-primary) / <alpha-value>)',
      critical: 'hsl(var(--border-critical) / <alpha-value>)',
      disable: 'hsl(var(--border-disable) / <alpha-value>)',
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent'
    },
    background: {
      page: 'hsl(var(--bg-page) / <alpha-value>)',
      fade: 'hsl(var(--bg-fade))',
      base: 'hsl(var(--bg-base) / <alpha-value>)',
      raise: 'hsl(var(--bg-raise) / <alpha-value>)',
      overlay: 'hsl(var(--bg-overlay) / <alpha-value>)',
      neutral: {
        DEFAULT: 'hsl(var(--bg-neutral) / <alpha-value>)',
        fade: 'hsl(var(--bg-neutral-fade))'
      },
      primary: {
        DEFAULT: 'hsl(var(--bg-primary) / <alpha-value>)',
        highlight: 'hsl(var(--bg-primary-highlight) / <alpha-value>)',
        active: 'hsl(var(--bg-primary-active) / <alpha-value>)',
        fade: 'hsl(var(--bg-primary-fade) / <alpha-value>)'
      },
      positive: {
        DEFAULT: 'hsl(var(--bg-positive) / <alpha-value>)',
        highlight: 'hsl(var(--bg-positive-highlight) / <alpha-value>)',
        active: 'hsl(var(--bg-positive-active) / <alpha-value>)',
        fade: 'hsl(var(--bg-positive-fade) / <alpha-value>)'
      },
      warn: {
        DEFAULT: 'hsl(var(--bg-warn) / <alpha-value>)',
        highlight: 'hsl(var(--bg-warn-highlight) / <alpha-value>)',
        active: 'hsl(var(--bg-warn-active) / <alpha-value>)',
        fade: 'hsl(var(--bg-warn-fade) / <alpha-value>)'
      },
      critical: {
        DEFAULT: 'hsl(var(--bg-critical) / <alpha-value>)',
        highlight: 'hsl(var(--bg-critical-highlight) / <alpha-value>)',
        active: 'hsl(var(--bg-critical-active) / <alpha-value>)',
        fade: 'hsl(var(--bg-critical-fade) / <alpha-value>)'
      },
      disable: {
        DEFAULT: 'hsl(var(--bg-disable) / <alpha-value>)',
        fade: 'hsl(var(--bg-disable-fade) / <alpha-value>)'
      },
      black: '#000000',
      white: '#ffffff',
      transparent: 'transparent'
    }
  }
}

// Tailwind plugin to create CSS variables. Uses convertToHsl and makeAlphaHslaString functions
// makeAlphaHslaString() function takes two arguments: 1) color to be made transparent, 2) Background color to base transparency on
type ColorValue = string | string[]
type ColorConfig = {
  [key: string]: ColorValue | ColorConfig
}

export function createVariables(
  config: ColorConfig
): ({ addBase }: { addBase: (base: ColorConfig) => void }) => void {
  const convertToHsl = (obj: ColorConfig) => {
    const result: ColorConfig = {}
    for (const key in obj) {
      const value = obj[key]
      if (typeof value === 'string') {
        result[key] = hexToHsl(value)
      } else if (
        Array.isArray(value) &&
        value.every((item) => typeof item === 'string')
      ) {
        // Assuming value is an array of two color strings
        result[key] = makeAlphaHslaString(value[0], value[1])
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        result[key] = convertToHsl(value as ColorConfig)
      }
    }
    return result
  }

  return ({ addBase }) => addBase(convertToHsl(config))
}
