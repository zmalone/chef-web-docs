/**
 * Created by intime on 31/1/17.
 */
'use strict';

var chefApp = angular.module('chefLabClient', ['socialLogin', 'ngCookies', 'ngResource', 'ngStorage', 'http-auth-interceptor', 'infinite-scroll'])
chefApp.constant('chefApiUrl', 'http://localhost:3000')
.constant('loadTracksCount', 10)
.constant('loadModulesCount', 8)
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
}).constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    }).constant('CHEF_API', {
        'clientId': 'XCDVSSS123434'
    }).config(function(socialProvider){

    //socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    //socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
    socialProvider.setFbKey({appId: "298912207152795", apiVersion: "v2.4"});
}).run(['$rootScope', 'AuthService', 'Session', '$sessionStorage', 'UserService', 'AUTH_EVENTS', function($rootScope, AuthService, Session, $sessionStorage, UserService, AUTH_EVENTS){
    $rootScope.logoutStatus = true;
    $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
        AuthService.chef_login(userDetails).then(function(response){
                //Set Session To Do once verify_token end point ready move
                // below code into verify_token success callback
                Session.set_session('accessToken', response.access_token);
                Session.set_session('refreshToken', response.refreshToken);
                Session.set_session('expiresIn', response.expiresIn);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $rootScope.logoutStatus = false;

                Session.set_session('accessToken', response.access_token);
                Session.set_session('id', response.access_token);
                Session.set_session('userId', response.access_token);
                //verify_token to get userInfo
                /*UserService.verify_token().then(function(userInfo){
                    $rootScope.setUser(userInfo);
                    Session.set_session('accessToken', response.access_token);
                    Session.set_session('id', response.access_token);
                    Session.set_session('userId', response.access_token);
                    $rootScope.logoutStatus = false;
                },
                function(err){
                    console.log("error while verifying access token");
                })*/

            },
         function(response){
             $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
         }

        )
    })

    $rootScope.$on('event:social-sign-out-success', function(event, logoutStatus){
        //To do error handling
        AuthService.chef_logout().then(function(response){
                $rootScope.logoutStatus = true;
                Session.destroy_session();
            },
            function(err){

            })
    })

    if(AuthService.isAuthenticated()){
        $rootScope.logoutStatus = false;
    }else{
        $rootScope.logoutStatus = true;
    }

}])
    .run(['$rootScope', '$injector','Session','CHEF_API','AuthService','$location','authService','AUTH_EVENTS','$localStorage','$sessionStorage', function($rootScope,$injector,Session, AuthService,CHEF_API,$location,authService,AUTH_EVENTS,$sessionStorage,$localStorage) {

        /*$rootScope.$on('event:auth-loginRequired', function(obj,response) {
            var CHEF_API = $injector.get('CHEF_API');
            var Session = $injector.get('Session');
            var authService = $injector.get('authService'); // http interceptor service
            var chefAuthService = $injector.get('AuthService'); //our auth service

            var credentials = {
                client_id: CHEF_API.clientId,
                grant_type: 'refresh_token',
                refresh_token: Session.get('refreshToken')
            };

            ownAuthService.refresh_token(credentials).then(function (response) {
                Session.set_session('accessToken', response.access_token);
                Session.set_session('refreshToken', response.refreshToken);
                Session.set_session('expiresIn', response.expiresIn);
                authService.loginConfirmed('success', function(config){
                    config.headers["Authorization"] = 'Bearer '+Session.get('accessToken');
                    return config;
                })

            }, function (response) {
                //redirect to login page
                Session.destroy_session();
                window.location.href="/";

            });
        });*/
       }]);
