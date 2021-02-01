// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecssConfig = require('./purgecss.config.js');
const purgecss = require('@fullhuman/postcss-purgecss');
const postcssPlugins = [
  tailwind(),
  autoprefixer()
];

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
if (process.env.NODE_ENV === 'production') {  
  postcssPlugins.push(
    purgecss(purgecssConfig)
  )
}

module.exports = {
  siteName: 'uniform-optimize-gridsome-contentful-starter',
  templates: {},
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
