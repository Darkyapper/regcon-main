// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Archivos de React
    "./node_modules/flowbite/**/*.js", // Incluir Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Añadir plugin de Flowbite
  ],
};
