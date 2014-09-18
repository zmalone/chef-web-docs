/* global angular */

module.exports = angular.module('chefLabClient').service('store', function($timeout) {

  function visitor() {

    var v = JSON.parse(localStorage.getItem('visitor')) || {
      id: require('node-uuid').v4(),
      prefs: {
        suppressCloudshareModal: false
      }
    };
    
    localStorage.setItem('visitor', JSON.stringify(v));
    return v;
  }

  return {
    visitor: visitor()
  }
});
