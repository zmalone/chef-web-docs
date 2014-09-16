/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner',
function (fetchMachine, store, $timeout, $rootScope, $window) {
  return function (scope, element, attrs) {

    scope.fetch = function () {
      fetchMachine(attrs, scope.visitorId);
    };

    scope.visitorId = store.visitorId();
  };
});
