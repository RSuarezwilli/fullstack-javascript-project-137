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
  devServer: {
    static: './dist',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // ✅ si usas SCSS
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // ✅ para tu styles.css
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/rss-validator/index.html', // ✅ Ruta correcta al HTML
    }),
  ],
};
