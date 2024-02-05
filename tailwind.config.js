/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'twilight-blue': '#F6F7F4',
        'black-pearl': '#001922',
        'sherpa-blue': '#023E55',
      },
      backgroundImage: {
        'footer-texture': "url('/footer-texture.png')",
      }
    },
    fontFamily: {
      inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'open-sans': ['Open Sans', 'ui-serif', 'Georgia']
    }
  },
  plugins: [() => import("tailwindcss-animate")],

}