module.exports = function (_, argv) {
  const path = require('path');
  const CircularDependencyPlugin = require('circular-dependency-plugin');
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

  const isProduction = argv.mode === 'production';
  const config = {
    entry: [
      './src/MyWidgets.ts',
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'MyWidgets.js',
      library: 'MyWidgets',
      libraryTarget: 'window',
    },
    optimization: {
      minimize: isProduction,
      usedExports: false
    },
    target: 'web',
    mode: argv.mode,
    devtool: isProduction ? false : 'cheap-module-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [path.resolve('./src'),'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
              {
                  loader: 'ts-loader',
                  options: {
                      configFile: 'tsconfig.json',
                      transpileOnly: true
                  }
              }
          ]
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true
      })
    ]
  };

  return config;
}
