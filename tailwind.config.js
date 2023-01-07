const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem'
            }
        },
        screens: {
            xs: '475px',
            ...defaultTheme.screens
        },
        colors: {
            transparent: 'transparent',
            white: 'white',
            black: 'black',
            bg: {
                page: 'hsla(var(--color-bg-page) / <alpha-value>)',
                base: 'hsla(var(--color-bg-base) / <alpha-value>)',
                elevated: 'hsla(var(--color-bg-elevated) / <alpha-value>)',
                neutral: 'hsla(var(--color-bg-neutral) / <alpha-value>)',
                'neutral-faded':
                    'hsla(var(--color-bg-neutral-faded) / <alpha-value>)',
                primary: 'hsla(var(--color-bg-primary) / <alpha-value>)'
            },
            fg: {
                neutral: 'hsla(var(--color-fg-neutral) / <alpha-value>)',
                'neutral-faded':
                    'hsla(var(--color-fg-neutral-faded) / <alpha-value>)'
            },
            border: {
                neutral: 'hsla(var(--color-border-neutral) / <alpha-value>)',
                'neutral-faded':
                    'hsla(var(--color-border-neutral-faded) / <alpha-value>)'
            },
            on: {
                primary: 'hsla(var(--color-on-primary) / <alpha-value>)'
            },
            accent: {
                1: 'hsla(var(--color-accent-1) / <alpha-value>)',
                2: 'hsla(var(--color-accent-2) / <alpha-value>)',
                3: 'hsla(var(--color-accent-3) / <alpha-value>)'
            }
        },
        extend: {
            spacing: {
                // Bottom spacing for iOS Home Indicator
                'safe-area-inset-bottom': 'env(safe-area-inset-bottom, 24px)'
            },
            screens: {
                standalone: { raw: '(display-mode: standalone)' }
            },

            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.fg.neutral'),
                        '--tw-prose-bold': theme('colors.fg.neutral'),
                        '--tw-prose-headings': theme('colors.fg.neutral'),
                        '--tw-prose-links': theme('colors.fg.neutral'),
                        /* TODO: fix, not working '--tw-prose-captions': theme('colors.fg.neutral-faded'), */

                        a: {
                            '&:hover': {
                                textDecoration: 'none'
                            }
                        },

                        code: {
                            display: 'inline-block',
                            color: 'var(--tw-prose-code)',
                            fontSize: theme('fontSize.sm')[0],
                            fontWeight: theme('fontWeight.semibold'),
                            backgroundColor: 'var(--color-bg-neutral-faded)',
                            borderRadius: theme('borderRadius.lg'),
                            paddingLeft: theme('spacing.1'),
                            paddingRight: theme('spacing.1')
                        }
                    }
                }
            })
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
