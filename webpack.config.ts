import * as path from 'path'
import { Configuration } from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'

const config: Configuration = {
  entry: {
    content: './src/chrome/content.tsx',
    background: './src/chrome/background.tsx',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
  ],
}

export default config
