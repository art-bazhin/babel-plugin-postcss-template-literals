const autoprefixer = require('autoprefixer');

module.exports = {
  tag: 'anotherCss',
  replace: '',
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['chrome >= 1']
    })
  ]
};
