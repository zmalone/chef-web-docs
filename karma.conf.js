var config        = require('./gulpfile.js/config')
var karmaWebpack  = require('karma-webpack')
var webpackConfig = require('./gulpfile.js/lib/webpack.test')
var path          = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-sourcemap-writer'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-remap-istanbul'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: 'lib/chef-lab-client/test.ts', watched: false }
    ],
    preprocessors: {
      'lib/chef-lab-client/test.ts': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
