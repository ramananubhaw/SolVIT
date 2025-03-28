/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#121A21',
        'app-dark': '#243647',
        'app-blue': '#1A80E5',
        'app-text': '#FFFFFF',
      },
      backgroundColor: {
        'app-bg': '#121A21',
        'app-dark': '#243647',
        'app-blue': '#1A80E5',
      },
      textColor: {
        'app-text': '#FFFFFF',
      }
    },
  },
  plugins: [],
}

