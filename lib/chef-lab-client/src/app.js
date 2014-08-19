/* global angular */

angular.module('chefLabClient', []);

require('./chef-lab-provisioner-directive');
require('./chef-lab-template-directive');

angular.module('chefLabClient').service('chefLabService', function ($rootScope) {
  var machines = {};

  setTimeout(function () { $rootScope.$emit('ubuntu-chefdk', { address: 'foo', user: 'test', password: '123' }); }, 1000);
  setTimeout(function () { $rootScope.$emit('ubuntu-chefdk', { address: 'foo', user: 'test', password: '321' }); }, 5000)
  return function (type) {
    machines[type] = machines[type] || {};
    return machines[type];
  };
});
