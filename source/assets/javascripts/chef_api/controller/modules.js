chefApp.controller('moduleCtrl', function ($rootScope, $scope, socialLoginService, loadModulesCount, Session, authService) {
    $scope.modules = tracks.modules;
    $scope.start =  0;
    $scope.end = loadModulesCount;
    $scope.tot_modules = tracks.modules.length;
    $scope.modules = tracks.modules.slice($scope.start, $scope.end);

    $scope.loadModule= function(){
        $scope.$broadcast('load_module_info');
    }
    $scope.$on('load_module_info', function(){
        $scope.start  =  $scope.end;
        $scope.end = $scope.start + loadModulesCount;
        var modules = tracks.modules.slice($scope.start, $scope.end);
        $scope.modules = $scope.modules.concat(modules);
    })

});
