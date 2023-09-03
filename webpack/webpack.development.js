module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              additionalData: '@import "src/styles/_mixins.scss";',
            },
          },
        ],
        include: /\.module\.(scss|css)$/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              additionalData: '@import "src/styles/_mixins.scss";',
            },
          },
        ],
        exclude: /\.module\.(scss|css)$/,
      },
    ],
  },
};
