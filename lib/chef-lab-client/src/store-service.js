/* global angular */

module.exports = angular.module('chefLabClient').service('store', function($timeout) {

  function visitor(v) {

    if (v) {
      localStorage.setItem('visitor', JSON.stringify(v));
    }
    else {
      v = JSON.parse(localStorage.getItem('visitor')) || {
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        }),
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
