import { createVariables, tokens } from './src/lib/style/colors'
import { fontFamily, screens } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    gradientColorStops: { ...tokens.colors.background },
    backgroundColor: { ...tokens.colors.background },
    borderColor: { ...tokens.colors.border },
    ringColor: { ...tokens.colors.border },
    ringOffsetColor: { ...tokens.colors.background },
    outlineColor: { ...tokens.colors.border },
    textDecorationColor: { ...tokens.colors.border },
    divideColor: { ...tokens.colors.border },
    textColor: { ...tokens.colors.text },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
    },
    screens: {
      xs: '475px',
      ...screens,
    },
    boxShadow: {
      subtle: '0 1px 1px 0px rgba(0, 0, 0, 0.05)',
      raise:
        '0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0px rgba(0, 0, 0, 0.1)',
      overlay:
        '0 8px 16px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      sink: '0 0.5px 1px 0px rgba(0, 0, 0, 0.10), 0 1px 3px 0px rgba(0, 0, 0, 0.05)',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-satoshi)', ...fontFamily.sans],
      },
      spacing: {
        // Bottom spacing for iOS Home Indicator
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom, 24px)',
      },
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': tokens.colors.text.neutral,
            '--tw-prose-bold': tokens.colors.text.neutral,
            '--tw-prose-headings': tokens.colors.text.neutral,
            '--tw-prose-links': tokens.colors.text.neutral,
            '--tw-prose-quotes': tokens.colors.text.neutral,
            /* TODO: fix, not working '--tw-prose-captions': theme('colors.fg.neutral-fade'), */

            a: {
              '&:hover': {
                textDecoration: 'none',
              },
            },
            /*    code: {
              display: 'inline-block',
              color: 'var(--tw-prose-code)',
              fontSize: theme('fontSize.sm')[0],
              fontWeight: theme('fontWeight.semibold'),
              backgroundColor: 'var(--color-bg-neutral-fade)',
              borderRadius: theme('borderRadius.lg'),
              paddingLeft: theme('spacing.1'),
              paddingRight: theme('spacing.1'),
            }, */
          },
        },
      },
      keyframes: {
        'rotate-3': {
          '0%': {
            transform: 'rotate(3deg)',
            animationTimingFunction: 'ease-in',
          },
          '100%': {
            transform: 'rotate(0deg)',
            animationTimingFunction: 'ease-in',
          },
        },
        'slide-up-8': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'translateX-0--100': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'translateX-100-0': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    createVariables({
      ':root': {
        // Page
        '--bg-page': colors.white,
        '--bg-fade': colors.neutral[50],
        '--bg-base': colors.white,
        '--bg-raise': colors.white,
        '--bg-overlay': colors.white,
        '--bg-sink': colors.neutral[100],

        // Neutral
        '--fg-neutral': colors.neutral[900],
        '--fg-neutral-fade': colors.neutral[500],
        '--border-neutral': colors.neutral[300],
        '--bg-neutral': colors.neutral[200],
        '--bg-neutral-highlight': colors.neutral[300],
        '--border-neutral-fade': [colors.neutral[100], colors.white],
        '--bg-neutral-fade': [colors.neutral[100], colors.white],
        '--on-neutral': colors.white,

        // Primary
        '--fg-primary': colors.green[600],
        '--border-primary': colors.green[600],
        '--bg-primary': colors.green[600],
        '--bg-primary-highlight': colors.green[700],
        '--bg-primary-active': colors.green[800],
        '--bg-primary-fade': [colors.green[50], colors.white],
        '--on-primary': colors.white,

        // Postive

        // Warn

        // Critical
        '--fg-critical': colors.red[600],
        '--border-critical': colors.red[500],
        '--bg-critical': colors.red[600],
        '--bg-critical-fade': [colors.red[100], colors.white],
        '--on-critical': colors.white,
        '--bg-critical-highlight': colors.red[500],

        // Disable
        '--fg-disable': colors.neutral[500],
        '--border-disable': colors.neutral[300],
        '--bg-disable': colors.neutral[200],
        '--bg-disable-fade': colors.neutral[100],
      },
      '[data-theme="dark"]': {
        // Page Dark
        '--bg-page': colors.neutral[950],
        '--bg-fade': [colors.neutral[900], colors.neutral[950]],
        '--bg-base': colors.neutral[950],
        '--bg-raise': colors.neutral[900],
        '--bg-overlay': colors.neutral[800],

        // Neutral Dark
        '--fg-neutral': colors.neutral[200],
        '--fg-neutral-fade': colors.neutral[400],
        '--border-neutral-fade': [colors.neutral[800], colors.neutral[950]],

        '--bg-neutral': colors.neutral[700],
        '--bg-neutral-fade': [colors.neutral[900], colors.neutral[950]],
        // Primary Dark
        '--bg-primary': colors.green[700],
        '--bg-primary-highlight': colors.green[600],
        '--bg-primary-active': colors.green[500],
        '--border-primary': colors.green[600],

        // Critical Dark
        '--bg-critical': colors.red[600],
        '--bg-critical-highlight': colors.red[700],
        '--bg-critical-active': colors.red[800],
      },
    }),
  ],
}
