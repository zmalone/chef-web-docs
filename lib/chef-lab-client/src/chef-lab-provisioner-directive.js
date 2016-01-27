/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner',
function (fetchMachine, store, $timeout, $rootScope, $window) {
  return function (scope, element, attrs) {

    scope.fetch = function(force) {

      if (scope.visitor.prefs.suppressSkytapModal || force === true) {
        $('#skytap-modal').foundation('reveal', 'close');

        fetchMachine(attrs, scope.visitor);
      }
      else {
        $('#skytap-modal').foundation('reveal', 'open');
      }
    };

    scope.visitor = store.visitor.get();

    scope.$watch('visitor', function() {
      store.visitor.set(this.last);
    }, true);
  };
});
