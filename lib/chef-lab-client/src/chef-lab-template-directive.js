module.exports = angular.module('chefLabClient').directive('chefLabTemplate', function (chefLabService, $rootScope) {
  return {
    link: function (scope, element, attrs) {
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
    }
  };
});
