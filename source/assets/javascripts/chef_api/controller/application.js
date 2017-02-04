chefApp.controller('applicationCtrl', function ($rootScope, $scope, socialLoginService, AuthService, Session) {
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.logout = function(){
        socialLoginService.logout()
    }
    $rootScope.setUser = function (userInfo) {
        $rootScope.currentUser = userInfo;
    };


    $scope.loadMore = function(){
        $scope.$broadcast('load_track_info');
    }
    $scope.$on('load_track_info', function(){
        

            var last = $scope.images[$scope.images.length - 1];
            for(var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
    })
    

});
