/* global angular */

var querystring = require('querystring');

angular.module('chefLabClient').service('fetchMachine', function (chefLabUrl, $http, $rootScope, $timeout) {

  function urlFor(type, id) {
    var url = chefLabUrl + '/labs/' + type.replace(/-/g, '/');
    url += '/provision' + (id ? '?' + querystring.stringify({ uid: id }) : '');
    return url;
  }

  return function (attrs, visitor) {

    if (attrs.chefLabProvisioner === 'cloudshare') {
      window.open(urlFor(attrs.type, visitor.id), '_blank');
    }
  }
});
