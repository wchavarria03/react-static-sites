const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const cssFilename = 'css/[name].[contenthash:8].css';
const extractTextPluginOptions = { publicPath: '/' };
const root = process.argv[process.argv.length - 1];; // get the last argument, the folder path

module.exports = {
  entry: `${root}/index.js`,
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolveApp('./src'),
        use: [
          {
            options: {
              formatter: eslintFormatter,
              emitError: true,
              emitWarning: true,
              failOnError: false,
              failOnWarning: false,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('./src'),
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['react', 'es2015', 'es2016', 'es2017'],
          plugins: ['es6-promise', 'transform-object-assign', 'transform-class-properties'],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src'],
          },
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
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
                  includePaths: ['../src/styles'],
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
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
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
};
