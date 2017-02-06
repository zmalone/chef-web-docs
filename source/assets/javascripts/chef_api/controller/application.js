chefApp.controller('applicationCtrl', function ($rootScope, $scope, socialLoginService, loadTracksCount, Session) {
    $scope.start =  0;
    $scope.end = loadTracksCount;
    $scope.tot_tracks = tracks.tracks.length;
    $scope.tracks = tracks.tracks.slice($scope.start, $scope.end);
    $scope.modules = tracks.modules;

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
        $scope.start  =  $scope.end;
        $scope.end = $scope.start + loadTracksCount;
        var track = tracks.tracks.slice($scope.start, $scope.end);
        $scope.tracks = $scope.tracks.concat(track);
        console.log($scope.modules);
    })


});
