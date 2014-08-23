/* global angular */

module.exports = angular.module('chefLabClient').service('store',
function ($rootScope) {
  var prefix = 'chefLab-machine-';

  function getMachine (type) {
    var machine = JSON.parse(localStorage.getItem(prefix + type));
    if (!machine) {
      machine = setMachine(type, { type: type });
    }
    return machine;
  }

  function setMachine (type, machine) {
    localStorage.setItem(prefix + type, JSON.stringify(machine));
    return machine;
  }

  $rootScope.$on('machine:change', function (event, data) {
    setMachine(data.type, data);
  });

  return {
    getMachine: getMachine
  }
});
