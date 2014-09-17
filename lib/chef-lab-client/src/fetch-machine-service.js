/* global angular */

var querystring = require('querystring'),
  uuid = require('node-uuid');

angular.module('chefLabClient').service('fetchMachine', function (chefLabUrl, $http, $rootScope, $timeout) {

  function urlFor(type, id) {
    var url = chefLabUrl + '/labs/' + type.replace(/-/g, '/');
    url += '/attend' + (id ? '?' + querystring.stringify({ uid: id }) : '');
    return url;
  }

  return function (attrs, id) {

    if (attrs.chefLabProvisioner === 'cloudshare') {
      $('#cloudshare-modal').foundation('reveal', 'close');

      $timeout(function() {
        window.open(urlFor(attrs.type, id), '_blank')
      }, 400);
    }
  }
});
