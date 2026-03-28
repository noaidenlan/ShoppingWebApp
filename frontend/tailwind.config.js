/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          400: '#818cf8',
          600: '#4f46e5',
          700: '#3730a3',
          800: '#1e1b4b',
          900: '#0f0e2a',
        },
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15,14,42,0.12), 0 1px 4px rgba(15,14,42,0.06)',
        'card-hover': '0 12px 40px -8px rgba(15,14,42,0.18), 0 2px 8px rgba(15,14,42,0.08)',
        glow: '0 0 0 3px rgba(79,70,229,0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
