const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For your React components
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite components
    flowbite.content(), // Flowbite's own content
  ],
  theme: {
    extend: {

      fontFamily: {
        montserrat: ["montserrat", "sans-serif"], // Add the new font here
      },

    },
  },
  plugins: [
    flowbite.plugin(), // Activates Flowbite plugin
  ],
};
