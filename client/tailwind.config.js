/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "rgba-0.3": "rgba(0,0,0,0.3)"
      }
    },
  },
  plugins: [],
}
