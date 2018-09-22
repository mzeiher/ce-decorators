const pkg = require('./package.json');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const webpackConfigDevelop = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    filename: 'bundle.js',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'umd')
  },
  externals: ['lit-html', 'lit-html/lib/shady-render'],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  }
}

const webpackConfigProduction = webpackMerge(webpackConfigDevelop, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: 'bundle.min.js',
  }
});

const webpackConfigTestBabel = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', './src/test/index.ts'],
  output: {
    library: pkg.name + '-test',
    libraryTarget: 'umd',
    filename: 'test-babel.js',
    path: path.resolve(__dirname, 'test')
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript',
                ['@babel/preset-env', {
                  targets: {
                    "chrome": "60",
                    "safari": "11",
                    "ie": "11"
                  },
                  modules: false,
                  useBuiltIns: 'entry'
                }]
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true}],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  "chrome": "60",
                  "safari": "11",
                  "ie": "11"
                },
                modules: false,
                useBuiltIns: 'entry'
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BABEL_COMPILE : true
    })
  ]
}

const webpackConfigTest = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', './src/test/index.ts'],
  output: {
    library: pkg.name + '-test',
    libraryTarget: 'umd',
    filename: 'test.js',
    path: path.resolve(__dirname, 'test')
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    "chrome": "60",
                    "safari": "11",
                    "ie": "11"
                  },
                  modules: false,
                  useBuiltIns: 'entry'
                }]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.test.json',
              compilerOptions: {
                declaration: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  "chrome": "60",
                  "safari": "11",
                  "ie": "11"
                },
                modules: false,
                useBuiltIns: 'entry'
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BABEL_COMPILE : false
    })
  ]
}

const webpackConfigTestCoverage = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', './src/test/index.ts'],
  output: {
    library: pkg.name + '-test',
    libraryTarget: 'umd',
    filename: 'test-istanbul.js',
    path: path.resolve(__dirname, 'test')
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: [{
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    "chrome": "60",
                    "safari": "11",
                    "ie": "11"
                  },
                  modules: false,
                  useBuiltIns: 'entry'
                }]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.test.json',
              compilerOptions: {
                declaration: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  "chrome": "60",
                  "safari": "11",
                  "ie": "11"
                },
                modules: false,
                useBuiltIns: 'entry'
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BABEL_COMPILE : false
    })
  ]
}

module.exports = [webpackConfigDevelop, webpackConfigProduction, webpackConfigTest, webpackConfigTestCoverage, webpackConfigTestBabel];
