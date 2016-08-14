const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {

  entry: {
    main: "./src/main"
  },

  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts', 'angular2-template'], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "raw!less" },
      { test: /\.jpg$/, loader: "file" },
      { test: /\.svg$/, loader: "url?mimetype=avatar/svg+xml" },
      { test: /\.png$/, loader: "url?mimetype=avatar/png" }
    ]
  },

  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
};