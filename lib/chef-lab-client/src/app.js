/* global angular */

angular.module('chefLabClient', []);

require('./chef-lab-provisioner-directive');
require('./chef-lab-template-directive');

angular.module('chefLabClient').service('chefLabService', function ($rootScope) {
  var machines = {};

  // fake stuff
  setInterval(function () {
    var statusSeed = Math.floor(Math.random() * 100 % 2);
    var statuses = ['ready', 'error']
    $rootScope.$emit('ec2-rhel-localmode', {
      address: '8.8.8.8',
      user: 'testuser',
      password: 'test123',
      status: statuses[statusSeed],
      expires: new Date()
    });
  }, 5000);

  return function (type) {
    machines[type] = machines[type] || {};
    return machines[type];
  };
});
