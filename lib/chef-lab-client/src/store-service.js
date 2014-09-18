/* global angular */

module.exports = angular.module('chefLabClient').service('store', function($timeout) {

  function visitor(v) {

    if (v) {
      localStorage.setItem('visitor', JSON.stringify(v));
    }
    else {
      v = JSON.parse(localStorage.getItem('visitor')) || {
        id: require('node-uuid').v4(),
        prefs: {
          suppressCloudshareModal: false
        }
      };
    }
    
    return v;
  }

  return {
    visitor: {
      get: function() { return visitor() },
      set: function(v) { return visitor(v) }
    }
  }
});
