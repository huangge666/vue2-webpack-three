const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = {
  // 入口文件
  entry: {
    main: "./src/main.js",
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    path: path.resolve(__dirname, "../dist"),
    // js文件下
    filename: "static/js/chunk-[contenthash].js",
    // 每次打包前自动清除旧的dist
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板
      template: "./public/index.html",
      // 打包后的名字
      filename: "index.html",
      // js文放入body里
      inject: "body",
      title: "THREE.js Demo"
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles/chunk-[contenthash].css",
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(":percent")} (:elapsed seconds)`,
    }),
  ],
  module: {
    rules: [
      {
        // 匹配文件后缀的规则
        test: /\.(css|s[cs]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       // 放置全局引入的公共scss文件
          //     ],
          //   },
          // },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 打包到 dist/image 文件下
          filename: "static/images/[contenthash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        // 使用include来指定编译文件夹
        include: path.resolve(__dirname, "../src"),
        // 使用exclude排除指定文件夹
        exclude: /node_modules/,
        use: ["cache-loader", "thread-loader", "babel-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.hdr$/,
        use: "url-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      assets: "~/assets",
    },
    // 引入文件时省略后缀
    extensions: [".js", ".ts", ".less", ".vue"],
  },
};
