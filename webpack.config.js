const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, arg) => {
  const isDev = arg.mode !== "production";

  return {
    entry: isDev ? "./src/index.js" : "./build/bundle.js",
    output: {
      filename: isDev ? "index.js" : "bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
      publicPath: "/",
    },
    mode: isDev ? "development" : "production",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isDev,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html", inject: "body" }),
      new MiniCssExtractPlugin({
        filename: "index.css",
        linkType: false,
      }),
    ],
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "build"),
      },
    },
  };
};
