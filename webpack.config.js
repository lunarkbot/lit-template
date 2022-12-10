const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  return {
    mode: env.build ? 'production' : 'development',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpeg|jpg|git|woff(2)?|webp)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      filename: env.build ? './assets/[contenthash].js' : './assets/script.js',
      clean: true,
    },
    devServer: {
      static: path.resolve(__dirname, './dist'),
      compress: true,
      port: 8080,
      open: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: env.build ? "./assets/[hash].css" : "./assets/style.css"
      }),
    ]
  }
};

