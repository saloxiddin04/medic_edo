/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1d89e4", //#1d89e4
        secondary: "#82868b", //#ffcf00
        success: "#28CD41",
        danger: "#ea5455",
        warning: "#ff9f43",
        info: "#9333EA",
        dark: "#2D2D2D",
        darkLayoutStorm: "#283046",
        darkLayoutMain: "#171D32",
        yellow: "#ffcf00"
      },
      boxShadow: {
        badgeShadow: "0 0 10px",
        buttonShadow: "0px 8px 25px -8px",
      },
    },
  },
  plugins: [],
};
