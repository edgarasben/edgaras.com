const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
            },
        },
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        colors: {
            transparent: 'transparent',
            white: 'white',
            black: 'black',
            'bg-page': 'hsla(var(--color-bg-page) / <alpha-value>)',
            'bg-base': 'hsla(var(--color-bg-base) / <alpha-value>)',
            'bg-neutral-faded': 'hsla(var(--color-bg-neutral-faded) / <alpha-value>)',
            'fg-neutral': 'hsla(var(--color-fg-neutral) / <alpha-value>)',
            'fg-neutral-faded': 'hsla(var(--color-fg-neutral-faded) / <alpha-value>)',
            'border-neutral': 'hsla(var(--color-border-neutral) / <alpha-value>)',
            'border-neutral-faded': 'hsla(var(--color-border-neutral-faded) / <alpha-value>)',
            'bg-primary': 'hsla(var(--color-bg-primary) / <alpha-value>)',
            'on-primary': 'hsla(var(--color-on-primary) / <alpha-value>)',
        },
        extend: {
            spacing: {
                // Bottom spacing for iOS Home Indicator
                'safe-area-inset-bottom': 'env(safe-area-inset-bottom, 24px)',
            },
            screens: {
                standalone: { raw: '(display-mode: standalone)' },
            },
        },
    },
    plugins: [],
}
