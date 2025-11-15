/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados - Paleta Justly Law Firm
        'primary-dark': '#2a2f36',     // Gris oscuro (colores oscuros principales)
        'primary': '#778cab',          // Azul grisáceo (botones y acentos principales)
        'secondary': '#797e84',        // Gris medio (textos secundarios)
        'background': '#dcd4cb',       // Beige claro (fondo principal)
        'accent': '#919faa',           // Gris azulado claro (hover states)
        'text-dark': '#100f0e',        // Negro puro (textos principales)
        'border': '#58595b',           // Gris oscuro (bordes)
        'gold': '#797258',             // Marrón dorado (detalles)
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
