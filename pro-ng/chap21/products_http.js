/**
 * **REAL** products data -- Uses data from Mongolab.
 */
angular.module("exampleApp", [])
  
  .constant("MONGOLAB_API_KEY", "ISXsR31X7VQjheVFt3rAMLTMrr0EXu89")
  .constant("MONGOLAB_BASE_URL", "https://api.mongolab.com/api/1/databases/angular1/collections/products")
  
  .config(function ($httpProvider, MONGOLAB_API_KEY) {
    $httpProvider.interceptors.push(function () {
      return {
        // Add the API key if we're requesting a Mongolab URL.
        request: function (config) {
          if (config.url.indexOf('https://api.mongolab.com') === 0) {
            config.url += '?apiKey=' + MONGOLAB_API_KEY;
          }
          return config;
        }
      };
    });
  })
  
  .controller("defaultCtrl", function($scope, $http, MONGOLAB_BASE_URL) {

    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.listProducts = function () {
      $http.get(MONGOLAB_BASE_URL).success(function (data) {
        $scope.products = data;
      });
    };

    $scope.deleteProduct = function (product) {
      $http({
        method: "DELETE",
        url: MONGOLAB_BASE_URL + '/' + product._id.$oid
      }).success(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
    };

    $scope.createProduct = function(product) {
      $http.post(MONGOLAB_BASE_URL, product).success(function (newProduct) {
        $scope.products.push(product);
        $scope.displayMode = "list";
      });
    };

    $scope.updateProduct = function(product) {
      var product_id = product._id.$oid;
      delete product._id;  // Don't include the ID when PUTting an object
      $http({
        url: MONGOLAB_BASE_URL + '/' + product_id,
        method: "PUT",
        data: product
      }).success(function (modifiedProduct) {
        for (var i = 0; i < $scope.products.length; i++) {
          if ($scope.products[i]._id.$oid == modifiedProduct._id.$oid) {
            $scope.products[i] = modifiedProduct;
            break;
          }
        }
      });
      $scope.displayMode = "list";
    };

    $scope.editOrCreateProduct = function(product) {
      $scope.currentProduct = product ? angular.copy(product) : {};
      $scope.displayMode = "edit";
    };

    $scope.saveEdit = function(product) {
      if (angular.isDefined(product._id) && angular.isDefined(product._id.$oid)) {
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