/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app_color-bg': '#A3E8FD',
        'app_color-light-blue': '#6081FF',
        'app_color-blue': '#3E66F9',
        'app_color-text': '#2D3748',
      },
      spacing: {
        'cities-list-w': '28rem'
      }
    },
  },
  plugins: [],
}

