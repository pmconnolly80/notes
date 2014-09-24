angular.module("exampleApp00", [])
  .controller("defaultCtrl", function ($scope) {
    
    $scope.counter = 0;
    
    $scope.incrementCounter = function() {
      $scope.counter++;
    };
});