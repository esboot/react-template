const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function () {
  const isDevMode = process.env.NODE_ENV === 'development';

  const postloader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDevMode,
      ident: 'postcss',
      plugins: [
        require('precss')(),
        require('autoprefixer')({ browsers: ['last 2 versions', 'iOS >= 8', "Android >= 4.4"] })
      ],
    }
  };

  const cfg = {
    mode: isDevMode ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
    output: {
      filename: isDevMode ? '[name].js' : '[name].[chunkhash:5].js',
    },
    module: {
      rules: [
        { test: /\.(jpg|gif|png|svg|ico)$/, loader: 'url-loader?name=images/[name].[ext]' },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          exclude: path.resolve(__dirname, 'src/global-css/'), // 非src/css下的scss开启局部样式模式
          loaders: [
            isDevMode ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader", options: {
                sourceMap: isDevMode,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
            postloader,
            { loader: "sass-loader", options: { sourceMap: isDevMode } },
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/css/'),
          loaders: [
            isDevMode ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: isDevMode } },
            postloader,
            { loader: "sass-loader", options: { sourceMap: isDevMode } },
          ],
        },
      ],
    },

  };

  if (isDevMode) {
    cfg.devServer = {
      compress: true,
      historyApiFallback: true,
      port: 9000,
      host: '0.0.0.0',
      useLocalIp: true,
      stats: {
        all: false,
        builtAt: true,
        errors: true,
        errorDetails: true,
        timings: true,
        warnings: true,
      },
    };
  } else {
    cfg.plugins = [
      new MiniCssExtractPlugin({
        filename: '[name].[hash:5].css',
        chunkFilename: '[id].[hash:5].css'
      })
    ];

    cfg.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            output: {
              comments: false,
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    };
  }

  return cfg;
};
