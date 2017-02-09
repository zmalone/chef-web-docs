chefApp.controller('applicationCtrl', function ($rootScope, $scope, socialLoginService, loadTracksCount, Session, authService) {


    $scope.logout = function(){
        socialLoginService.logout()

    }
    $rootScope.setUser = function (userInfo) {
        $rootScope.currentUser = userInfo;
    };

});
