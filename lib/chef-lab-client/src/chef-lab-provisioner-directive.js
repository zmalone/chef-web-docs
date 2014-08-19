/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner', function ($rootScope, chefLabService) {
  return function (scope, element, attrs) {
    $rootScope.$on(attrs.type, function (event, data) {
      scope.machine = data;
    });

    scope.machine = chefLabService(attrs.type);
  };
});


