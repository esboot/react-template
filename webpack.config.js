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
