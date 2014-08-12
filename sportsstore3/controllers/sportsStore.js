angular.module("sportsStore")
  .constant("dataUrl", "https://api.parse.com/1/classes/Product")
  .constant("orderUrl", "https://api.parse.com/1/classes/Order")
  .controller("sportsStoreCtrl", function ($scope, $http, $location,
    dataUrl, orderUrl, cart) {

    $scope.data = {};

    var request_config = {
      headers: {
        'X-Parse-Application-Id': 'Qy0pNFI8sNeqeDZQizNjTUC6xHOzNc3G8pC2P4WP',
        'X-Parse-REST-API-Key': 'UStYUtESj8D3B6WKlGAjbxwh8pztU6uK0sMPVMvC'
      }
    };

    // $scope.data = {
    //   products: [{
    //     name: "Product #1",
    //     description: "A product",
    //     category: "Category #1",
    //     price: 100
    //   }, {
    //     name: "Product #2",
    //     description: "A product",
    //     category: "Category #1",
    //     price: 110
    //   }, {
    //     name: "Product #3",
    //     description: "A product",
    //     category: "Category #2",
    //     price: 210
    //   }, {
    //     name: "Product #4",
    //     description: "A product",
    //     category: "Category #3",
    //     price: 202
    //   }]
    // };

    $http.get(dataUrl, request_config)
      .success(function (data) {
        // Parse.com returns the data as data.results
        $scope.data.products = data.results;
      })
      .error(function (error) {
        // Parse.com returns an error object with an error property: error.error
        $scope.data.error = error;
      });

    $scope.sendOrder = function(shippingDetails) {
      var order = angular.copy(shippingDetails);
      order.products = cart.getProducts();
      $http.post(orderUrl, order, request_config)
        .success(function(data) {
          // The Parse.com API returns an object that looks like this:
          // {createdAt: "2014-08-04T17:48:10.057Z", objectId: "eYoUqWFMEz"} 
          $scope.data.orderId = data.objectId;
          cart.getProducts().length = 0;
        })
        .error(function(error) {
          $scope.data.orderError = error;
        })
        .finally(function() {
          $location.path("/complete");
        });
    };

  });