/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner',
function (fetchMachine, store, $timeout, $rootScope) {
  return function (scope, element, attrs) {
    scope.fetch = function () {
      scope.machine.status = 'waiting';
      scope.$emit('machine:change', scope.machine);
      fetchMachine(attrs.type, scope.machine.sessionId);
    };

    $rootScope.$on('machine:change', function (event, data) {
      if (data.type === attrs.type) {
        $timeout(function () { scope.machine = data; });
      }
    });

    scope.machine = store.getMachine(attrs.type);

    if (scope.machine.status === 'waiting' || scope.machine.status === 'error') {
      scope.fetch();
    }
  };
});
