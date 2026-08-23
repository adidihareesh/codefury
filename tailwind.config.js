/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft Lavender, Warm Beige, Muted Peach Overrides
        white: '#3D3546', // Inverted: Dark Espresso/Plum for text on buttons and dark cards
        black: '#F9F6F0', // Inverted: Warm Beige
        slate: {
          50: '#2A2432',  // Darkest Plum
          100: '#3D3546', // Main Text (was lightest) -> Dark Espresso/Plum
          200: '#4F455A',
          300: '#625C70', // Regular Text -> Deep Lavender
          400: '#8A8498', // Muted Text -> Soft Lavender
          500: '#AAA2B6',
          600: '#C7C0C7', // Borders
          700: '#D5CDD4', 
          800: '#E6DFD3', // Elevated elements -> Muted Taupe
          900: '#F1EBE1', // Cards (was dark) -> Richer Warm Beige
          950: '#F9F6F0', // Main Background (was darkest) -> Soft Warm Beige
        },
        teal: {
          50: '#54362E',  // Darkest Peach-Brown
          100: '#75493F',
          200: '#9E6558',
          300: '#B87869', // Accent Text (was light) -> Rich Peach/Terracotta
          400: '#CD8B7C', 
          500: '#DFA290', // Accent elements
          600: '#E9B3A4', // Main Buttons (was primary dark teal) -> Muted Pastel Peach
          700: '#F0C4B8',
          800: '#F6D9D2',
          900: '#FBF0ED', // Lightest Peach background
          950: '#FEF8F7',
        },

        textPrimary: 'var(--color-text-primary)',
        bgPrimary: 'var(--color-bg-primary)',
        textInverse: 'var(--color-text-inverse)',
        bgInverse: 'var(--color-bg-inverse)',
        danger: 'var(--color-danger)',
        dangerBg: 'var(--color-danger-bg)',
        success: 'var(--color-success)',
        successBg: 'var(--color-success-bg)',
        warning: 'var(--color-warning)',
        warningBg: 'var(--color-warning-bg)',
        accent: 'var(--color-accent)',
        accentBg: 'var(--color-accent-bg)',
        fintech: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' }
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        bank: ['Arial', 'Helvetica', 'sans-serif']
      },
      
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 35px rgba(20, 184, 166, 0.7)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.2s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
