/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    extend: {
      backgroundImage: {
        gradientBg: "url('public/assets/img/bg.jpg')",
      },
    },
  },
  plugins: [],
};
