/* global angular */

module.exports = angular.module('chefLabClient').service('store',
function ($rootScope, $timeout) {

  function uuid() {
    var id = localStorage.getItem('visitorId') || require('node-uuid').v4();
    localStorage.setItem('visitorId', id);
    return id;
  }

  return {
    visitorId: uuid
  }
});
