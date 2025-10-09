// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development', // 'production' o 'development'
  entry: './src/index.js', // El punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // La carpeta de salida
    filename: 'bundle.js', // El nombre del archivo empaquetado
  },
  devServer: {
    static: './dist',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Regla para archivos Sass/SCSS
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // Regla para archivos CSS
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Usa tu index.html como plantilla
    }),
  ],
};