/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner', function ($rootScope, chefLabService) {
  window.r = $rootScope
  return function (scope, element, attrs) {
    $rootScope.$on(attrs.type, function (event, data) {
      scope.machine = data;
      scope.$digest();
    });

    scope.machine = chefLabService(attrs.type);
  };
});


