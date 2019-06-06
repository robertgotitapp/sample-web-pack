const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.(jpe?g)|(png)$/,
      //   loader: 'my-loader',
      //   include: [
      //     path.resolve(__dirname, 'src'),
      //     path.resolve(__dirname, 'public')
      //   ],
      //   options: {
      //     name: 'static/media/[name].[hash:8].[ext]',
      //   }
      // },
      {
        test: /\.(jpe?g)|(png)$/,
        loader: [
          {
            'loader': 'url-loader',
            'options': {
              'limit': 8192
            }
          }
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'public')
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};