/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fast_ping: {
          '25%, 50%': {
            transform: 'scale(2)',
            opacity: '0',
          }
        },
        medium_ping: {
          '50%, 75%': {
            transform: 'scale(2)',
            opacity: '0',
          }
        },
        slow_ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          }
        },
      },
      animation: {
        fast_ping: 'fast_ping 3s ease-in-out infinite',
        medium_ping: 'medium_ping 3s ease-in-out infinite',
        slow_ping: 'slow_ping 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
