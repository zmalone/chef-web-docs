/* global angular */

var querystring = require('querystring'),
  uuid = require('node-uuid');

angular.module('chefLabClient').service('fetchMachine', function (chefLabUrl, $http, $rootScope) {

  function urlFor(type, id) {
    var url = chefLabUrl + '/labs/' + type.replace(/-/g, '/');
    url += '/attend' + (id ? '?' + querystring.stringify({ uid: id }) : '');
    return url;
  }

  return function (attrs, id) {

    if (attrs.chefLabProvisioner === 'cloudshare') {
      window.open(urlFor(attrs.type, id), '_blank');
    }
  }
});
