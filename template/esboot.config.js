module.exports = {
  serverPort: 8001,
  browsers: ['last 2 versions', 'iOS >= 8', 'Android >= 4.4'],
  copyFile: [],
  html: [
    {
      name: 'index',
      title: 'React App',
      entry: './src/index',
      links: ['./static/swiper.min.css'],
      scripts: ['./static/swiper.min.js']
    }
  ],
};
