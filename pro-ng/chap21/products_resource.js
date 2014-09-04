/**
 * **REAL** products data -- Uses data from Mongolab.
 */
angular.module("exampleApp", ['ngResource'])
  
  .constant("MONGOLAB_API_KEY", "ISXsR31X7VQjheVFt3rAMLTMrr0EXu89")
  .constant("MONGOLAB_BASE_URL", "https://api.mongolab.com/api/1/databases/angular1/collections/products")
  
  .config(function ($httpProvider, MONGOLAB_BASE_URL, MONGOLAB_API_KEY) {
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
  
  .controller("defaultCtrl", function($scope, $resource, MONGOLAB_BASE_URL) {

    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.productsResource = $resource(MONGOLAB_BASE_URL + "/:id", { id: "@_id.$oid" }, {
      update: {method: 'PUT'}
    });

    $scope.listProducts = function () {
      $scope.products = $scope.productsResource.query();
    };

    $scope.deleteProduct = function (product) {
      product.$delete().then(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
      $scope.displayMode = "list";
    };

    $scope.createProduct = function(product) {
      new $scope.productsResource(product).$save().then(function(newProduct) {
        $scope.products.push(newProduct);
        $scope.displayMode = "list";
      });
    };

    $scope.updateProduct = function(product) {
      var product_id = product._id.$oid;
      delete product._id;  // Don't include the ID when PUTting an object
      product.$update({id: product_id});  // Custom method
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
      if ($scope.currentProduct && $scope.currentProduct.$get) {
        $scope.currentProduct.$get();
      }
      $scope.currentProduct = {};
      $scope.displayMode = "list";
    };

    $scope.listProducts();
  });