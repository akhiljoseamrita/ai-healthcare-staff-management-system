/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "primary-purple": "#6318FF",
        "primary-blue": "#1152d4",
        "primary-deep": "#5b13ec",
        "primary-alt": "#0f49bd",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",
      },
      fontFamily: {
        "display": ["Inter", "Public Sans", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
        "public-sans": ["Public Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
