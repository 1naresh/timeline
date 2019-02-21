const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlPlugin = new HtmlWebPackPlugin({
//   template: "./src/index.html",
//   filename: "./index.html" 
// });
module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options:{
              importLoaders : 1,
              // modules : true, 
              // localIdentName : '[name]_[local]_[hash:base64:5]'
            }
          }
          // { loader: "style-loader" },
          // { loader: "css-loader" } 
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                // limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      },           
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
}
