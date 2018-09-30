const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const userConfig = require('./esboot.config');

module.exports = function () {
  const isDevMode = process.env.NODE_ENV === 'development';

  const postloader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDevMode,
      ident: 'postcss',
      plugins: [
        require('precss')(),
        require('autoprefixer')({ browsers: userConfig.browsers })
      ],
    }
  };

  const cfg = {
    devtool: isDevMode ? 'cheap-module-eval-source-map' : '',
    mode: isDevMode ? 'development' : 'production',
    performance: {
      hints: false,
    },
    entry: {
      index: './src/index',
      demo: './src/page/demo',
      demo2: './src/page/demo2',
      demo3: './src/page/demo3',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
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
        { test: /\.hbs$/, loader: "handlebars-loader" },
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

  cfg.plugins = [
    // new FriendlyErrorsWebpackPlugin(),
    // new WebpackBar(),
    // new webpack.NamedModulesPlugin(),
    new ErrorOverlayPlugin()
  ];

  if (isDevMode) {
    cfg.devServer = {
      // clientLogLevel: 'none',
      compress: true,
      watchContentBase: true,
      // historyApiFallback: {
      //   disableDotRule: true,
      // },
      port: 9000,
      host: '0.0.0.0',
      useLocalIp: true,
      // quiet: true,
      // overlay: false,
      // before(app) {
      //   // This lets us open files from the runtime error overlay.
      //   app.use(errorOverlayMiddleware());
      //   // This service worker file is effectively a 'no-op' that will reset any
      //   // previous service worker registered for the same host:port combination.
      //   // We do this in development to avoid hitting the production cache if
      //   // it used the same host and port.
      //   // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
      //   // app.use(noopServiceWorkerMiddleware());
      // },
      // stats: {
      //   all: false,
      //   builtAt: true,
      //   errors: true,
      //   errorDetails: true,
      //   timings: true,
      //   warnings: true,
      // },
    };

    cfg.plugins = cfg.plugins.concat([
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['index'],
        filename: 'index.html',
        title: "ESBoot App",
        template: 'template/index.hbs'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['demo'],
        filename: 'demo.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['demo2'],
        filename: 'demo2.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['demo3'],
        filename: 'demo3.html'
      }),
    ]);
    // cfg.optimization = {
    //   noEmitOnErrors: true
    // }
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
