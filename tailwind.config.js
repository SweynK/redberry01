/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: "#DBDBDB", // Custom color for the border
      },
      screens: {
        desktop: "1920px", // Setting a custom screen size for large desktops
      },
    },
  },
  plugins: [],
};
