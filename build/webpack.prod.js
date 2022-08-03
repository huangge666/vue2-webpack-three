const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("prodction"),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
    // new BundleAnalyzerPlugin(),
    // gzip
    new CompressionPlugin({
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
    }),
    // 构建命令行日志
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public/static"),
        to: "static",
        globOptions: {
          ignore: [".*"],
        },
      }
    ]),
  ],
  stats: "errors-only",
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
      new TerserPlugin({
        // 压缩JS代码
        terserOptions: {
          compress: {
            drop_console: true, // 去除 console
          },
        },
      }),
    ],
  },
});
