'use strict';

chefApp.factory('AuthService', function ($resource, chefApiUrl, Session, CHEF_API) {

        var authService = {};

        authService.chef_login = function (credentials) {

            var user = $resource(chefApiUrl + '/v1/auth/',{},{
                    save:{
                        method:"POST",
                        headers:{'Access-Control-Allow-Origin': '*','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest  :   function(data, headersGetter){return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data},
                        ignoreAuthModule : true
                    }
                }
            );

            return user.save(credentials).$promise.then(function(response) {
                return response;
            });

        };

        authService.refresh_token = function (credentials) {

            var user = $resource(chefApiUrl + '/refresh_token/',{},{
                    save:{
                        method:"POST",
                        headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest  :   function(data, headersGetter){return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data},
                        ignoreAuthModule : true
                    }
                }
        );

        return user.save(credentials).$promise.then(function(response) {
            return response;
        });

    };

        authService.isAuthenticated = function () {
                return !!Session.get_session('userId');
        };

        authService.chef_logout = function() {
            var logoutInfo = {
                'client_id':CHEF_API.clientId,
                'access_token':Session.get_session('accessToken')
            }
           var logout = $resource(chefApiUrl + '/v1/logout',{},{
                    save:{
                        method:"POST",
                        headers:{'Access-Control-Allow-Origin': '*','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest  :   function(data, headersGetter){return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data},
                        ignoreAuthModule : true

                    }
                }
            );

            return logout.save(logoutInfo).$promise.then(function() {
                return logout;
            });
        };

        return authService;
    });