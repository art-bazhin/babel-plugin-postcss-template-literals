const autoprefixer = require('autoprefixer');

module.exports = {
  tag: 'anotherCss',
  replace: '',
  plugins: [
    autoprefixer({
      browsers: ['chrome >= 1']
    })
  ]
};
