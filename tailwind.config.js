/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'twilight-blue': '#F6F7F4',
        'black-pearl': '#001922',
        'sherpa-blue': '#023E55',
      },
    },
    fontFamily: {
      inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'open-sans': ['Open Sans', 'ui-serif', 'Georgia']
    }
  },
  plugins: [],
}