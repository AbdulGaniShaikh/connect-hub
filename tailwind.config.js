/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#df6688',
        primaryColorDark: '#d14169',
        // primaryColor: '#66dfdf',
        // primaryColorDark: '#3ddada',
        hoverGray: '#ffffff66',
        chatRecieverColor: '#D9FDD3',

        lightBg: '#f8f8ff',
        colorOnLight: '#333333',
        lightHover: '#e5e5e5',

        darkBg: '#0f0f0f',
        colorOnDark: '#ffffff',
        darkHover: '#272727',

        darkVariant: '#1f2326'
      },
      width: {
        120: '27rem',
        circleImage: '36px'
      },
      height: {
        circleImage: '36px',
        chat: '38rem'
      },
      fontSize: {
        defaultProfile: '36px'
      },
      backgroundImage: {
        blob: "url('/src/assets/auth/blob.png')"
      },
      animation: {
        vote: 'vote 1s ease-in-out'
      },
      keyframes: {
        vote: {
          '0%, 100%': {
            transform: 'rotate(-30deg)'
          },
          '50%': {
            transform: 'rotate(30deg)'
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
};
