const path = require("path");

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "polkadot-dapp.min.js",
    library: 'ATokenProvider',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
    // filename: '[name].min.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  } ,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
    ]
  }
};

module.exports = config;