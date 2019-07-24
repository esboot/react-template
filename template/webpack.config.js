const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const userConfig = require('./esboot.config');

function initEntry() {
  return {
    entry: userConfig.html.reduce((prev, curr, idx, arr) => {
      prev[curr.name] = curr.entry;
      return prev;
    }, {}),
    plugins: userConfig.html.map(i => {
      return new HtmlWebpackPlugin({
        inject: true,
        chunks: [i.name],
        filename: `${i.name}.html`,
        title: i.title || 'ESboot App',
        template: i.template || 'template/index.html',
      })
    }),
  }
}

module.exports = function () {
  const isDevMode = process.env.NODE_ENV === 'development';
  const { entry, plugins } = initEntry();

  const postloader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDevMode,
      ident: 'postcss',
      plugins: [
        require('precss')(),
        require('autoprefixer')({ overrideBrowserslist: userConfig.browsers })
      ],
    }
  };

  const cfg = {
    devtool: isDevMode ? 'cheap-module-source-map' : '',
    mode: isDevMode ? 'development' : 'production',
    performance: {
      hints: false,
    },
    entry,
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
    },
    output: {
      filename: isDevMode ? 'js/[name].js' : 'js/[name].[chunkhash:5].js',
    },
    module: {
      rules: [
        { test: /\.(jpg|gif|png|svg|ico)$/, loader: 'url-loader?name=images/[name].[ext]' },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
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
              loader: 'css-loader', options: {
                sourceMap: isDevMode,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
            postloader,
            { loader: 'sass-loader', options: { sourceMap: isDevMode } },
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/global-css/'),
          loaders: [
            isDevMode ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDevMode } },
            postloader,
            { loader: 'sass-loader', options: { sourceMap: isDevMode } },
          ],
        },
      ],
    },

  };

  cfg.plugins = plugins;

  if (isDevMode) {
    cfg.devServer = {
      compress: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      port: userConfig.serverPort,
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
    cfg.plugins = cfg.plugins.concat([
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:5].css',
        chunkFilename: 'css/[id].[hash:5].css'
      }),
    ]);

    cfg.optimization = {
      splitChunks: {
        chunks: 'all',
        name: 'vendor',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
          },
        }
      },
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
