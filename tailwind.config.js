/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        

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
