
module.exports = {
  entry: './scripts/index.js',
  watch: true,
  output: {
    path: require('path').join(__dirname, '../dist'),
    filename: 'app.js'
  }
};
