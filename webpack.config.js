const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
    filename: 'bundle.js',
  },
  
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build',
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,        
        use: [      
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ], 
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader"
    },
      
    ],
  },
  
  
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },

  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    
  }
};

