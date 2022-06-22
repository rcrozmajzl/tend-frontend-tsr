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
      },
      fontFamily: {
        Thasadith : ['Thasadith', "sans-serif"],
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
