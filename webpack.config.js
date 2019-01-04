const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "."),
    port: 8812,
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      "/api": "http://localhost:8811"
    },
    overlay: true
  },
  devtool: "source-map",
  resolve: {
    alias: {
      'three/GLTFLoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/GLTFLoader.js')
    }
  },
  plugins:[
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new HtmlWebpackPlugin({
      title: "My app",
      hash: true,
      template: "index.html"
    })
  ]
}
