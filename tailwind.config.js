import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        accent: '#F97316',
        dark: '#1F2937',
        surface: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 20px 45px -24px rgba(30, 64, 175, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(30,64,175,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '22px 22px',
      },
    },
  },
  plugins: [forms],
}
