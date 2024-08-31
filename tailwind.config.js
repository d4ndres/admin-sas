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
      background: 'rgb(var(--color-background) / <alpha-value>)',
      background_body: 'rgb(var(--color-background-body) / <alpha-value>)',
      background_alt: 'rgb(var(--color-background-alt) / <alpha-value>)',
      selection: 'rgb(var(--color-selection) / <alpha-value>)',
      text_main: 'rgb(var(--color-text-main) / <alpha-value>)',
      text_bright: 'rgb(var(--color-text-bright) / <alpha-value>)',
      text_muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
      links: 'rgb(var(--color-links) / <alpha-value>)',
      focus: 'rgb(var(--color-focus) / <alpha-value>)',
      border: 'rgb(var(--color-border) / <alpha-value>)',
      code: 'rgb(var(--color-code) / <alpha-value>)',
      animation_duration: 'rgb(var(--color-animation-duration) / <alpha-value>)',
      button_base: 'rgb(var(--color-button-base) / <alpha-value>)',
      button_hover: 'rgb(var(--color-button-hover) / <alpha-value>)',
      scrollbar_thumb: 'rgb(var(--color-scrollbar-thumb) / <alpha-value>)',
      scrollbar_thumb_hover: 'rgb(var(--color-scrollbar-thumb-hover) / <alpha-value>)',
      form_placeholder: 'rgb(var(--color-form-placeholder) / <alpha-value>)',
      form_text: 'rgb(var(--color-form-text) / <alpha-value>)',
      variable: 'rgb(var(--color-variable) / <alpha-value>)',
      highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
    }
  },
  plugins: [],
}

