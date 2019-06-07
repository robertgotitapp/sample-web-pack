const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const wp = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },

  
  devServer: {
    // For hot server replacement
    hot: true
  },

  module: {

    rules: [



      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          "plugins": ["react-hot-loader/babel"]
        }
      },

      {
        test: /\.(jpe?g)|(png)$/,
        loader: 'my-loader',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'public')
        ],
        options: {
          'limit': 8192,
          name: 'static/img/[name].[ext]',
        }
      },

      // {
      //   test: /\.(jpe?g)|(png)$/,
      //   loader: [
      //     {
      //       'loader': 'file-loader',
      //       'options': {
      //         'limit': 8192,
      //         'name': 'static/img/[name].[hash:8].[ext]'
      //       },
      //     }
      //   ],
      //   include: [
      //     path.resolve(__dirname, 'src'),
      //     path.resolve(__dirname, 'public')
      //   ]
      // },

      // {
      //   test: /\.jsx?$/,
      //   use: [
      //     // {
      //     //   loader: 'babel-loader'
      //     // },
      //     {
      //       'loader': 'my-loader-2',
      //     }
      //   ],
      //   exclude: path.resolve(__dirname, 'node_modules')
      // },

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
    }),
    // For hot server replacement
    new wp.HotModuleReplacementPlugin()
  ]
};