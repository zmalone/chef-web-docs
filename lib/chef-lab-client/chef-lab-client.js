(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/app.js":[function(require,module,exports){
/* global angular */

angular.module('chefLabClient', []);

require('./chef-lab-provisioner-directive');
require('./chef-lab-template-directive');

angular.module('chefLabClient').service('chefLabService', ["$rootScope", function ($rootScope) {
  var machines = {};

  setTimeout(function () { $rootScope.$emit('ubuntu-chefdk', { address: 'foo', user: 'test', password: '123' }); }, 1000);
  setTimeout(function () { $rootScope.$emit('ubuntu-chefdk', { address: 'foo', user: 'test', password: '321' }); }, 5000)
  return function (type) {
    machines[type] = machines[type] || {};
    return machines[type];
  };
}]);

},{"./chef-lab-provisioner-directive":"/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/chef-lab-provisioner-directive.js","./chef-lab-template-directive":"/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/chef-lab-template-directive.js"}],"/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/chef-lab-provisioner-directive.js":[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner', ["$rootScope", "chefLabService", function ($rootScope, chefLabService) {
  return function (scope, element, attrs) {
    $rootScope.$on(attrs.type, function (event, data) {
      scope.machine = data;
    });

    scope.machine = chefLabService(attrs.type);
  };
}]);



},{}],"/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/chef-lab-template-directive.js":[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabTemplate', ["chefLabService", "$rootScope", function (chefLabService, $rootScope) {
  return function (scope, element, attrs) {
    function extend(data) {
      ['address', 'user', 'password'].forEach(function (i) {
        if (data[i]) {
          scope[i] = data[i];
        } else {
          scope[i] = '{{' + i + '}}';
        }
      });
    }

    $rootScope.$on(attrs.type, function (event, data) {
      extend(data);
      scope.$digest();
    });

    extend(chefLabService(attrs.type));
  };
}]);

},{}]},{},["/Users/nathansmith/Projects/learn-chef/lib/chef-lab-client/src/app.js"]);
