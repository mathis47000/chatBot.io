/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

