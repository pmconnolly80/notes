angular.module("exampleApp01", [])
  .controller("defaultCtrl", function ($scope, $http) {
    
    $http.get("productData.json").success(function (data) {
      $scope.products = data;
    });
    
});