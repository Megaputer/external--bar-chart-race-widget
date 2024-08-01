module.exports = function (_, argv = {}) {
  const path = require('path');
  const CircularDependencyPlugin = require('circular-dependency-plugin');
  const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const TerserPlugin = require("terser-webpack-plugin");
  const { getWebpackEntriesPatterns } = require('external-widget-cli');

  const { mode = 'production', outputPath = path.resolve(__dirname, 'build') } = argv;
  const isProduction = mode === 'production';
  const { entry, patterns } = getWebpackEntriesPatterns(outputPath);

  const config = {
    entry,
    output: {
      path: outputPath,
      filename: '[name].js',
      library: {
        name: '[name]',
        type: 'self',
      },
      libraryTarget: 'window',
      clean: isProduction
    },
    optimization: {
      minimize: isProduction,
      usedExports: false,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
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
      }),
      new CopyPlugin({ patterns })
    ]
  };

  return config;
}
