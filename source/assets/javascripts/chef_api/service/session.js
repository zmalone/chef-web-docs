'use strict';

chefApp.factory('Session', function ($cookieStore) {

    var sessionService = {}

    sessionService.set_session = function(key, value){
        $cookieStore.put(key, value);
    }

    sessionService.get_session = function(key){
        return $cookieStore.get(key);
    }

    sessionService.destroy_session = function(){
        $cookieStore.remove('accessToken');
        $cookieStore.remove('refreshToken');
        $cookieStore.remove('expiresIn');
        $cookieStore.remove('userId');
        $cookieStore.remove('id');
    }

    return sessionService

    })

