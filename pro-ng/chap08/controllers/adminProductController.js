angular.module("sportsStoreAdmin")
  .constant("productUrl", "https://api.parse.com/1/classes/Product")
  .config(function($httpProvider) {
    // $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'Qy0pNFI8sNeqeDZQizNjTUC6xHOzNc3G8pC2P4WP';
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'UStYUtESj8D3B6WKlGAjbxwh8pztU6uK0sMPVMvC';

    // Parse.com returns data wrapped under data.results.
    // Add a transformResponse function to extract the results from that property.
    $httpProvider.defaults.transformResponse.push(function(data) {
      if (data.results) {
        return data.results;
      }
      return data;
    });
  })
  .controller("productCtrl", function($scope, $resource, productUrl) {

    $scope.productsResource = $resource(productUrl + "/:id", {
      id: "@objectId"
    });

    $scope.listProducts = function() {
      $scope.products = $scope.productsResource.query();
    };

    $scope.deleteProduct = function(product) {
      // console.log('product', product);
      product.$delete().then(function() {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
    };

    $scope.createProduct = function(product) {
      product.price = parseInt(product.price);
      new $scope.productsResource(product).$save().then(function(newProduct) {
        console.log('newProduct', newProduct);
        $scope.products.push(newProduct);
        $scope.editedProduct = null;
      });
    };

    $scope.updateProduct = function(product) {
      product.$save();
      $scope.editedProduct = null;
    };

    $scope.startEdit = function(product) {
      $scope.editedProduct = product;
    };

    $scope.cancelEdit = function() {
      $scope.editedProduct = null;
    };

    $scope.listProducts();
  });