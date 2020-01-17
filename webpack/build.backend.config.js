const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')

module.exports = {
  externals: [nodeExternals()],
  entry: path.resolve(
    __dirname,
    '../backend/src/party/presenters/rest/index.ts',
  ),
  output: {
    filename: 'backend.js',
    path: path.resolve(__dirname, '../dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              experimentalWatchApi: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()],
  },
  target: 'node',
}
