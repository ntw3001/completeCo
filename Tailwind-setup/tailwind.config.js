/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Tailwind-setup/index.html",
    "./Tailwind-setup/**/*.html"
  ],
  safelist: [
    'bg-pink-200',
    'text-red-600',
    'p-3',
    'p-32'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}
