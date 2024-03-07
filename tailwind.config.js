/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#df6688',
        primaryColorDark: '#d14169',
        backgroundLight: '#fffafa',
        hoverGray: '#ffffff66',
        chatRecieverColor: '#D9FDD3'
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
  plugins: []
};
