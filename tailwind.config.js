/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tipografías más grandes por defecto para adultos mayores
        'base': ['1.125rem', '1.75rem'],   // 18px
        'lg':   ['1.25rem',  '1.875rem'],  // 20px
        'xl':   ['1.5rem',   '2rem'],      // 24px
        '2xl':  ['1.875rem', '2.25rem'],   // 30px
        '3xl':  ['2.25rem',  '2.75rem'],   // 36px
      },
      colors: {
        primary: {
          DEFAULT: '#0E7490', // teal oscuro, alto contraste
          hover:   '#155E75',
          light:   '#CFFAFE',
        },
        risk: {
          low:    '#16A34A',
          medium: '#D97706',
          high:   '#DC2626',
        },
      },
      minHeight: {
        'btn': '56px', // botones cómodos para adultos mayores
      },
    },
  },
  plugins: [],
};