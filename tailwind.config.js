/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da Ordem Jedi
        jedi: {
          'blue-light': '#a0d2eb', // Azul Claro (Sabres de Luz)
          'brown': '#795548',       // Marrom (Túnicas Jedi)
          'green-light': '#90ee90', // Verde Claro (Sabres de Luz)
          'gold': '#ffd700',        // Dourado (Sabedoria)
          'grey-light': '#d3d3d3',  // Cinza Claro (Equilíbrio)
        },
        // Paleta da República Galáctica
        republic: {
          'blue-royal': '#4169e1', // Azul Royal (Autoridade)
          'gold': '#ffd700',       // Dourado (Prosperidade)
          'red': '#ff4500',        // Vermelho (Paixão pela Justiça)
          'white': '#ffffff',      // Branco (Paz)
          'silver': '#c0c0c0',     // Prata (Tecnologia)
        },
      },
    },
  },
  plugins: [],
}
