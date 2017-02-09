chefApp.controller('trackCtrl', function ($rootScope, $scope, socialLoginService, loadTracksCount, Session, authService) {
    $scope.start =  0;
    $scope.end = loadTracksCount;
    $scope.tot_tracks = tracks.tracks.length;
    $scope.tracks = tracks.tracks.slice($scope.start, $scope.end);

    $scope.loadMore = function(){
        $scope.$broadcast('load_track_info');
    }
    $scope.$on('load_track_info', function(){
        $scope.start  =  $scope.end;
        $scope.end = $scope.start + loadTracksCount;
        var track = tracks.tracks.slice($scope.start, $scope.end);
        $scope.tracks = $scope.tracks.concat(track);
    })

});
