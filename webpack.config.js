const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Specify if we are in dev or prod or test
// Production on Heroku, Test in testing, development in dev
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

module.exports = env => {
  const isProduction = env === "production";
  /**
   * TODO: Replace isProduction with NODE_ENV
   * DO NOT replace build scripts, since heroku will set it's own NODE_ENV
   */
  console.log("isProduction", isProduction);
  console.log("NODE_ENV", process.env.NODE_ENV);

  return {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "./public/", "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          // Run bable
          // Loader: transforms a file before webpack uses it
          // Test: the files to transform (regex)
          // Exclude: don't modify these files
          // Babel-loader uses the .babelrc configuration file to take arguments
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          // Use scss (and css) and put it into the dom
          // Order matters for the 'use' array
          test: /\.s?css$/,
          use: [
            // Source maps not working with style-loader on firefox for now
            // isProduction
            //   ? MiniCssExtractPlugin.loader
            //   : {
            //       loader: "style-loader",
            //       options: {
            //         sourceMap: true
            //       }
            //     },
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        )
      })
    ],
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "./public/"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};
