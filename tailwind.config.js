/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00FFFF',
        'fire-orange': '#FF4500',
        'phosphor-green': '#39FF14',
        'background-dark': '#101922',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'led': ['Orbitron', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
        'retro': ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
