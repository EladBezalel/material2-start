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
      { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "raw!less" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "url-loader?mimetype=avatar/svg+xml" },
      { test: /\.png$/, loader: "url-loader?mimetype=avatar/png" }
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