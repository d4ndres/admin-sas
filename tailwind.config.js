/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      vainilla: '#FFF5E0',
      dark: 'rgba(31, 31, 31, 1)',
      dark_opacity: 'rgba(31, 31, 31, 0.5)',
      gray: '#d9d9db',
      gray_dark: '#444444',
      gray_dark_font: '#bfbfbf',
      red: '#B91C1C',
      white: '#fafafa',
      green: '#1C4F30',
      green_light: '#8DECB4',
      blue_deep: '#141E46'
    }
  },
  plugins: [],
}

