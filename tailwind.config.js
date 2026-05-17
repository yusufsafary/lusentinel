/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#0f0f0f',
        panel: '#141414',
        card: '#111111',
        'border-soft': 'rgba(255,255,255,0.07)',
        'border-strong': 'rgba(255,255,255,0.12)',
        accent: '#3B82F6',
        'gray-1': '#e8e8e8',
        'gray-2': '#a0a0a0',
        'gray-3': '#606060',
        'gray-4': '#303030',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['56px', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
