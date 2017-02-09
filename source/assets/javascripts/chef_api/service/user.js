'use strict';

chefApp.factory('UserService', function ($resource, chefApiUrl, Session) {

        var userService = {};
        var accessToken = Session.get_session('accessToken');
        userService.verify_token = function () {
            var user = $resource(chefApiUrl + '/v1/profile/',{},{
                get: {
                    headers: { 'Authorization': 'Bearer '+accessToken }
                }
            });

            return user.get().$promise.then(function(response) {
                return response.data;
            });
        };

        return userService;
    });
