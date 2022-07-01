/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'navbar-green': '#e5edc7',
        'navlink-green' : '#6f913d',
        'theme-xx-dark-grey' : '#a5a093',
        'theme-x-dark-grey' : '#b4afa1',
        'theme-dark-grey' : '#cfcaba',
        'theme-med-grey' : '#edece8',
        'theme-light-grey' : '#f5f3ef',
        'theme-warm-yellow' : '#ffd773',
        'theme-light-blue': '#d5f1f0',
        'theme-med-light-blue': '#a6daf1',
        'theme-med-light-purple': '#bec4ed',
        'theme-dark-green': '#435725',
      },
      fontFamily: {
        Thasadith : ['Thasadith', "sans-serif"],
      },
      backgroundImage: {
        'hexagons': "url('./assets/backgrounds/hexagons.svg')",
        'green-white-leaves': "url('./assets/backgrounds/green-white-leaves-background.jpg')",
        'sun': "url('./assets/backgrounds/sun-bg.jpg')",
      },
      boxShadow:  {
        'greenhouse': '0px 0px 25px 5px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
