const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['detectBrowsers', 'jasmine', 'source-map-support'],
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.min.js',
      'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
      'test/test-istanbul.js'
    ],
    reporters: ['mocha', 'coverage-istanbul', 'junit'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_DISABLED,
    
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    customLaunchers: {
      fixed_chrome: {
        base: 'ChromeHeadless',
        flags: ['--headless', '--disable-gpu', '--no-sandbox']
      }
    },
    preprocessors: {
      'test/test-istanbul.js' : ['sourcemap']
    },
    detectBrowsers: {
      // enable/disable, default is true
      enabled: true,
 
      // enable/disable phantomjs support, default is true
      usePhantomJS: false,
 
      // use headless mode, for browsers that support it, default is false
      preferHeadless: true,
      postDetection: function(availableBrowsers) {
        availableBrowsers = availableBrowsers.filter((value) => value.indexOf('Chrome') < 0)
        availableBrowsers = availableBrowsers.filter((value) => value.indexOf('Safari') < 0)
        availableBrowsers.push('fixed_chrome');
        console.log(availableBrowsers);
        return availableBrowsers;
      }
    },

    junitReporter: {
      outputDir: path.join(__dirname, 'reports', 'junit')
    },
    // any of these options are valid: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],

      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'reports', 'coverage'),

      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Omit files with no statements, no functions and no branches from the report
      skipFilesWithNoCoverage: true,

      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },

      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0
        },
        // thresholds per file
        each: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0,
          overrides: {
          }
        }
      },

      verbose: false // output config used by istanbul for debugging
    }

  })
}
