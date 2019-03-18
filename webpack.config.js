const pkg = require('./package.json');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /(\.tsx?|\.js)$/,
          loader: 'babel-loader',
          sideEffects: true,
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-typescript',
              ['@babel/preset-env', {
                targets: {
                  "chrome": "70"
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
              }],
              ["@babel/plugin-transform-runtime",
                {
                  "corejs": false,
                  "helpers": true,
                  "regenerator": true,
                  "useESModules": true
                }
              ]
            ]
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

  const webpackConfigDevelopUMD = webpackMerge(webpackConfigDevelop, {
    externals: ['lit-html', 'lit-html/lib/shady-render'],
    output: {
      filename: 'umd.js',
    },
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: path.resolve(__dirname, 'reports', 'report_develop_umd.json'),
        reportFilename: path.resolve(__dirname, 'reports', 'report_develop_umd.html')
      })
    ]
  });

  const webpackConfigProductionUMD = webpackMerge(webpackConfigDevelop, {
    externals: ['lit-html', 'lit-html/lib/shady-render'],
    mode: 'production',
    devtool: 'none',
    output: {
      filename: 'umd.min.js',
    },
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: path.resolve(__dirname, 'reports', 'report_production_umd.json'),
        reportFilename: path.resolve(__dirname, 'reports', 'report_production_umd.html')
      })
    ]
  });

  const webpackConfigTest = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [ /*'@babel/polyfill',*/ './src/__tests__/index.ts'],
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
                babelrc: false,
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
                  babelrc: false,
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
                  babelrc: false,
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
    ]
  }

  const webpackConfigTestCoverage = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [ /*'@babel/polyfill',*/ './src/__tests__/index.ts'],
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
                babelrc: false,
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
                  babelrc: false,
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
                  babelrc: false,
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
    ]
  }

  const webpackConfigDevServer = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [ /*'@babel/polyfill',*/
      './src/__tests__/components/TestWithMultipleProperties.ts',
      './src/__tests__/components/TestWithMultiplePropertiesWithType.js',
      './src/__tests__/components/TestWithMultiplePropertiesWithType.stage2.js',
      './src/__tests__/components/TestWithMultiplePropertiesWithTypeTS.ts'
    ],
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
                babelrc: false,
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
                  babelrc: false,
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
                  babelrc: false,
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
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  if (env && env.devserver) {
    return webpackConfigDevServer;
  } else {
    return [webpackConfigDevelop, webpackConfigProduction, webpackConfigTest, webpackConfigTestCoverage, webpackConfigProductionUMD, webpackConfigDevelopUMD];
  }

}
