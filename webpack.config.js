const path = require("path");

const config = {
  entry: {
    'polkadot-dapp': "./src/index.ts",
    'polkadot-dapp-util': './src/util.ts'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    library: 'ATokenProvider',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    filename: '[name].min.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  } ,
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                target: 'es5',
                module: 'esNext',
                sourceMap: false
              }
            }
          }
        ],
        exclude(path) {
          return path.includes('node_modules');
        }
      },
    ]
  }
};

module.exports = config;