module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          ...webpackConfig.entry,
          content: './src/chrome/content.js',
          background: './src/chrome/background.ts',
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
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            name: false,
          },
          runtimeChunk: false,
        },
      }
    },
  },
}
