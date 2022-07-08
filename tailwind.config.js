const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
            height: {
              '92px': '92px',
              '120px':'120px'
            },
            width:{
              '422px':'422px',
              '22rem':'370px',
              '150px':'150px'
            },
            colors:{
              'redBook':'#f14d54',
              'greenBook':'#80BF32',
              'searchColor':'rgb(33,33,33)',
              // 'titleBg':'rgb(65,65,65)',
            },
    },
    screen:{
      'fwidth':{'max':'655px'}
    },
  },

  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.productImage::file-selector-button': {
          padding: '.5rem 1rem',
          // borderRadius: '.25rem',
          backgroundColor:'#f14d54',
          color:'white',
          borderWidth:'0'
        },
        '#divScroll': {
          margin:'4px, 4px',
          padding:'4px',
          backgroundColor: 'white',
          position:'absolute',
          top:'20%',
          width: '425px',
          height: '440px',
          overflowX: 'hidden',
          overflowY: 'auto',
          textAlign:'justify'
      }
        

      })
    })
  ]
}