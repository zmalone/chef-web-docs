/* global angular */

angular.module('chefLabClient').service('fetchMachine', function (chefLabUrl, $http, $rootScope) {
  function munge(type, data) {
    return {
      status: 'ready',
      type: type,
      expires: data[0].expirationTime,
      address: data[0].ip,
      user: data[0].username,
      password: data[0].password,
      rdpFileUrl: chefLabUrl + '/labs/download_rdp?user_name=' +
        data[0].username + '&ip_address=' + data[0].ip
    }
  }

  function urlFor(type) {
    return chefLabUrl + '/labs/' + type.replace(/-/g, '/') + '/provision.json';
  }

  return function (type) {
    if (window.location.search.indexOf('fake') !== -1) {
      setTimeout(function () {
        $rootScope.$emit('machine:change', {
          type: type,
          message: 'fuuuuuu\nbar',
          status: ['error', 'ready'][Math.floor((Math.random() * 100) % 2)],
          //status: 'error',
          address: '127.0.0.1',
          user: 'testuser',
          password: 'test123',
          expires: new Date(),
          rdpFileUrl: 'http://test.com'
        });
      }, 5000);
    } else {
      $http.get(urlFor(type)).
        success(function (data) {
          $rootScope.$emit('machine:change', munge(type, data));
        }).
        error(function () {
          $rootScope.$emit('machine:change', {
            type: type,
            status: 'error'
          });
        });
    }
  }
});
