const path = require('path');

module.exports = {

  mode: 'development',

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
  extensions: [
    '.web.js',
    '.js',
    '.web.ts',
    '.ts',
    '.web.tsx',
    '.tsx',
  ],

  alias: {
    'react-native$': 'react-native-web',
    '@assets': path.resolve(__dirname, 'src/components/assets/'),
  },
},

 module: {
  rules: [

    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },

    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    },

    {
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: 'asset/resource',
    },

  ],
},
  devServer: {

    static: {
      directory: path.join(__dirname, 'public'),
    },

    historyApiFallback: true,

    port: 3000,

    hot: true,

  },

};