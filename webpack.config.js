const path = require('path');

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/css/'), // 非src/css下的scss开启局部样式模式
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&sourceMap=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/css/'),
        loaders: ['style-loader?sourceMap', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 9092,
    host: '0.0.0.0',
    useLocalIp: true,
    open: true,
    stats: {
      all: false,
      builtAt: true,
      errors: true,
      errorDetails: true,
      timings: true,
      warnings: true,
    }
  },
};
