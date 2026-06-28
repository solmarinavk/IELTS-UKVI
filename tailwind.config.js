/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        exam: {
          bg: '#f1f5f9',
          panel: '#ffffff',
          border: '#cbd5e1',
          ink: '#1e293b',
          accent: '#1d4ed8',
          accentDark: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
