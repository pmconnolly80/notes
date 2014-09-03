/**
 * **REAL** products -- Uses data from Mongolab.
 */
angular.module("exampleApp", [])
  
  .constant("MONGOLAB_API_KEY", "ISXsR31X7VQjheVFt3rAMLTMrr0EXu89")
  .constant("MONGOLAB_BASE_URL", "https://api.mongolab.com/api/1/databases/angular1/collections/products")
  
  // .config(function ($httpProvider, MONGOLAB_BASE_URL, MONGOLAB_API_KEY) {
  //   $httpProvider.interceptors.push(function () {
  //     return {
  //       // Add the API key if we're requesting a Mongolab URL.
  //       request: function (config) {
  //         if (config.url == MONGOLAB_BASE_URL) {
  //           config.url += '?apiKey=' + MONGOLAB_API_KEY;
  //         }
  //         return config;
  //       }
  //     };
  //   });
  // })
  
  .controller("defaultCtrl", function($scope, $http, MONGOLAB_BASE_URL, MONGOLAB_API_KEY) {

    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.listProducts = function () {
      var url = MONGOLAB_BASE_URL + '?apiKey=' + MONGOLAB_API_KEY;
      $http.get(url).success(function (data) {
        $scope.products = data;
      });
    };

    $scope.deleteProduct = function (product) {
      $http({
        method: "DELETE",
        url: MONGOLAB_BASE_URL + '/' + product._id.$oid + '?apiKey=' + MONGOLAB_API_KEY
      }).success(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
    };

    $scope.createProduct = function(product) {
      $scope.products.push(product);
      $scope.displayMode = "list";
    };

    $scope.updateProduct = function(product) {
      for (var i = 0; i < $scope.products.length; i++) {
        if ($scope.products[i].id == product.id) {
          $scope.products[i] = product;
          break;
        }
      }
      $scope.displayMode = "list";
    };

    $scope.editOrCreateProduct = function(product) {
      $scope.currentProduct =
        product ? angular.copy(product) : {};
      $scope.displayMode = "edit";
    };

    $scope.saveEdit = function(product) {
      if (angular.isDefined(product.id)) {
        $scope.updateProduct(product);
      } else {
        $scope.createProduct(product);
      }
    };

    $scope.cancelEdit = function() {
      $scope.currentProduct = {};
      $scope.displayMode = "list";
    };

    $scope.listProducts();
  });