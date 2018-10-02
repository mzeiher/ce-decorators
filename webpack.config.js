const pkg = require('./package.json');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {

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

const webpackConfigTest = {
  mode: 'development',
  devtool: 'none',
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
        oneOf: [{
            test: /\.stage2\.js$/,
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
                ],
                plugins: [
                  ["@babel/plugin-proposal-decorators", {
                    legacy: false,
                    decoratorsBeforeExport: true
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]
                
              }
            }
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
                ],
                plugins: [
                  ["@babel/plugin-proposal-decorators", {
                    legacy: true
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]

              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BABEL_COMPILE: false
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
              ],
              plugins: ['babel-plugin-istanbul']
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
        oneOf: [{
          test: /\.stage2\.js$/,
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
                ],
                plugins: [
                  'babel-plugin-istanbul',
                  ["@babel/plugin-proposal-decorators", {
                    legacy: false,
                    decoratorsBeforeExport: true
                    
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]
                
              }
            }
          },
          {
            test: /\.js/,
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
                ],
                plugins: [
                  'babel-plugin-istanbul',
                  ["@babel/plugin-proposal-decorators", {
                    legacy: true
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      BABEL_COMPILE: false
    })
  ]
}

const webpackConfigDevServer = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', 
          './src/test/components/TestWithMultipleProperties.ts',
          './src/test/components/TestWithMultiplePropertiesWithType.js',
          './src/test/components/TestWithMultiplePropertiesWithType.stage2.js',
          './src/test/components/TestWithMultiplePropertiesWithTypeTS.ts'],
  output: {
    library: pkg.name + '-test',
    libraryTarget: 'umd',
    filename: 'devserver.js',
    path: path.resolve(__dirname, 'test')
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    filename: 'devserver.js',
    port: 9000
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
        oneOf: [{
            test: /\.stage2\.js$/,
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
                ],
                plugins: [
                  ["@babel/plugin-proposal-decorators", {
                    legacy: false,
                    decoratorsBeforeExport: true
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]
                
              }
            }
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
                ],
                plugins: [
                  ["@babel/plugin-proposal-decorators", {
                    legacy: true
                  }],
                  ["@babel/plugin-proposal-class-properties", {
                    "loose": true
                  }]
                ]

              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BABEL_COMPILE: false
    })
  ]
}

if(env.devserver) {
  return webpackConfigDevServer;
} else {
  return [webpackConfigDevelop, webpackConfigProduction, webpackConfigTest, webpackConfigTestCoverage];
}

}
