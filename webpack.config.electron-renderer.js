var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  debug: true,

  entry: {
    'angular2': [
      'rxjs',
      'reflect-metadata',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': './src/app/app.ts',
  },

  output: {
    path: __dirname + '/app/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: path.resolve('src/node_modules'),
    extensions: ['','.ts','.js','.json', '.css', '.html']
  },

  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass"],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader : 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common',   filename: 'common.js' }),
    new CopyWebpackPlugin([
      {from: 'src/node_modules/angular2/bundles/angular2-polyfills.js', to: 'angular2-polyfills.js'},
      {from: 'src/node_modules/ng2-material/dist/MaterialIcons-Regular.ttf', to: 'fonts'},
      {from: 'src/node_modules/ng2-material/dist/MaterialIcons-Regular.woff', to: 'fonts'},
      {from: 'src/node_modules/ng2-material/dist/MaterialIcons-Regular.woff2', to: 'fonts'}
    ])
  ],
  target:'electron-renderer'
};
