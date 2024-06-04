/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monsherrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#5600FF",
        pale: "#FCFFE7",
        Secondary: "#D9E4EA",
        "dark-blue": "#1F1926",
      },
    },
  },
  plugins: [],
};
