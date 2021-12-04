const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    content: './src/chrome/content.js',
    background: './src/chrome/background.js',
  },
  // mode: "development",
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/build/',
    filename: 'static/js/[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
  ],
}
