/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner',
function (fetchMachine, store, $timeout, $rootScope, $window) {
  return function (scope, element, attrs) {
    scope.fetch = function () {
      scope.machine.status = 'waiting';
      $timeout(function () { scope.$emit('machine:change', scope.machine); });
      fetchMachine(attrs.type, scope.machine.sessionId);
    };

    $rootScope.$on('machine:change', function (event, data) {
      if (data.type === attrs.type) {
        $timeout(function () { scope.machine = data; });
      }
    });

    $window.onbeforeunload = function (event) {
      var message = 'Your virtual machine is still being provisioned. If you leave this page the provisioning may not be completed.';
      if (scope.machine.status === 'waiting') {
        (event || $window.event).returnValue = message;
        return message
      }
    };

    scope.$on('destroy', function (event) { delete $window.onbeforeunload; })

    scope.machine = store.getMachine(attrs.type);

    if (scope.machine.status === 'waiting' || scope.machine.status === 'error') {
      scope.fetch();
    }
  };
});
