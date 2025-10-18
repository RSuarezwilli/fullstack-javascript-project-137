// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development', // 'production' o 'development'
  entry: './src/rss-validator/index.js', // ✅ Ruta correcta al archivo principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Limpia la carpeta dist antes de generar nuevos archivos
  },

  // ✅ Configuración para trabajar en Docker o local
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    host: '0.0.0.0', // importante para entorno Docker
    hot: true,
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/, // Si usas SASS
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // Si usas CSS normal
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/rss-validator/index.html', // ✅ Tu HTML principal
    }),
  ],

  // ✅ Permite importaciones relativas simples
  resolve: {
    extensions: ['.js'],
  },
}

