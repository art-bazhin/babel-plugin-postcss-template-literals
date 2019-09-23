const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['chrome >= 1']
    })
  ]
};
