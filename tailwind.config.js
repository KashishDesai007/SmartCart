/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [    "./src/**/*.{js,ts,jsx,tsx}",
  "./public/index.html"],
  theme: {
    colors:{
      neavyBlue: '#071739',
    aquariumBlue: '#4B6382',
    lightBlue:'#A4B5C4',
    cloudyWhite: '#CDD5DB',
    goldenBrown: '#A68868',
    lightBrwone: '#E3C390',
    redColor:'#FF0000',
    whiteColor: '#ffff',
    fadedBlackColor: '#323232',
    greenColor: '#00ff00',
    goldeYellow:'#FFDE2E'
    },
    plugins: [require('tailwind-scrollbar-hide')],
    extend: {
      keyframes:{
        spinCard : {
          '0%':{ transform: 'rotate(90.0deg)'},
          '100%':{ transform: 'rotate(0.0deg)'}
        }
      },
      animation: {
        'spin-slow': 'spin .5s linear 1',
        'flip-card':'spinCard .5s ease-in-out 1'
      }
    },
  },
  plugins: [],
}

