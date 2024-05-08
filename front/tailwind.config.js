/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        primary: "#4fb547",
        primaryNeon: "#00fa43",
        secondary: "#f6f6f6",


        "tertiary": "#000",
        "newWhite": "#e3e3e3",
        "newBlack": "#1f1f1f",
        "primaryBg": "#141A1F",
        "primaryBgBorder": "#1f2a33",
        "primaryOnHover": "#1a5415",
        "bodyColor": "#b5b5b5",
        "shadow": "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(20,26,31,1) 61%)"
      },
      fontFamily: {
        "title": ["Poppins", "sans-serif"],
        "body": ["Mulish", "sans-serif"]
      },
      fontSize: {
        "movieSlideTitle": "36px",
        "navTitle": "28px",
        "title": "24px",
        "subTitle": "20px",
        "smallDevicesTitle": "18px",
        "extraSmallTitle": "16",
        "body": "14px",
        "subBody": "12px",
        "links": "14px",
        "subLinks": "12px",
        "iconSize": "24px",
        "smallIconSize": "20px"
      },
    }
  },
  plugins: [],

}