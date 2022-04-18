const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  // 模式
  mode: "development",
  // 入口文件
  entry: {
    main: "./src/main.js",
  },
  // 输出
  output: {
    // 输出到 dist文件夹
    path: path.resolve(__dirname, "./dist"),
    // js文件下
    filename: "js/chunk-[contenthash].js",
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
    }),
    new MiniCssExtractPlugin({
      filename: "styles/chunk-[contenthash].css",
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
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
          filename: "images/[contenthash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      assets: "~/assets",
      tools: "~/tools",
    },
    // 引入文件时省略后缀
    extensions: [".js", ".ts", ".less", ".vue"],
  },
  devServer: {
    port: 8888,
    // 自动打开浏览器
    open: false,
  },
};
