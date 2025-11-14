/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados de Quiroga Abogados
        'primary-dark': '#172345',    // Negro muy oscuro/Gris azulado oscuro
        'primary': '#BE8B51',          // Marrón/Bronce (color de acento)
        'secondary': '#677689',        // Gris medio/Gris azulado
        'background': '#FAFCFF',       // Blanco roto/Blanco muy claro
        'accent': '#DBBAB1',           // Rosa pálido/Tostado claro (hover)
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
