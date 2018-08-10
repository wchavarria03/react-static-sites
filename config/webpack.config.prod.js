const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const root = process.argv[process.argv.length - 1];; // get the last argument, the folder path

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const cssFilename = 'css/[name].[contenthash:8].css';
const extractTextPluginOptions = { publicPath: '../' };

module.exports = {
  // Don't continue if there are any errors.
  bail: false,
  devtool: 'source-map',
  entry: ['babel-polyfill', `${root}/index.js`],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    strictExportPresence: true,
    loaders: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: resolveApp('./src'),
      },
      {
        test: /\.js$/,
        include: resolveApp('./src'),
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
          presets: ['react', 'es2015', 'es2016', 'es2017'],
          plugins: ['es6-promise', 'transform-object-assign', 'transform-class-properties'],
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src'],
            minimize: false,
          },
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(Object.assign(
          {
            // fallback: require.resolve('style-loader'),
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                },
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [path.resolve(__dirname, '../src/styles')],
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.resolve(__dirname, '../src/styles/base.scss'),
                  ],
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // Fix flexbox issues
                    require('postcss-flexbugs-fixes'), // eslint-disable-line
                    autoprefixer({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          extractTextPluginOptions,
        )),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      minify: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100',
      },
      jpegtran: {
        progressive: true,
      },
    }),
    new webpack.BannerPlugin({
      banner: `
      Root folder: ${root}
      Date: ${new Date()}
      `,
    }),
  ],
};
