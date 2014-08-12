angular.module("sportsStoreAdmin")
  .constant("authUrl", "https://api.parse.com/1/login")
  .constant("ordersUrl", "https://api.parse.com/1/classes/Order")
  .controller("authCtrl", function($scope, $http, $location, authUrl, utils) {

    var request_config = {
      headers: {
        'X-Parse-Application-Id': 'Qy0pNFI8sNeqeDZQizNjTUC6xHOzNc3G8pC2P4WP',
        'X-Parse-REST-API-Key': 'UStYUtESj8D3B6WKlGAjbxwh8pztU6uK0sMPVMvC'
      }
    };

    $scope.authenticate = function(user, pass) {
      // Prepare the data in the format expected by the Parse.com API.
      var params = { username: user, password: pass };
      var url = authUrl + '?' + utils.buildQueryString(params);
      $http.get(url , request_config)
        .success(function(data) {
          $location.path("/main");
        })
        .error(function(error) {
          $scope.authenticationError = error;
        });
    };
  })
  .controller("mainCtrl", function($scope) {

    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function(index) {
      $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function() {
      return $scope.current == "Products" ? "views/adminProducts.html" : "views/adminOrders.html";
    };
  })
  .controller("ordersCtrl", function($scope, $http, ordersUrl) {

    var request_config = {
      headers: {
        'X-Parse-Application-Id': 'Qy0pNFI8sNeqeDZQizNjTUC6xHOzNc3G8pC2P4WP',
        'X-Parse-REST-API-Key': 'UStYUtESj8D3B6WKlGAjbxwh8pztU6uK0sMPVMvC'
      }
    };

    $http.get(ordersUrl, request_config)
      .success(function(data) {
        $scope.orders = data;
      })
      .error(function(error) {
        $scope.error = error;
      });

    $scope.selectedOrder;

    $scope.selectOrder = function(order) {
      $scope.selectedOrder = order;
    };

    $scope.calcTotal = function(order) {
      var total = 0;
      for (var i = 0; i < order.products.length; i++) {
        total +=
          order.products[i].count * order.products[i].price;
      }
      return total;
    };
  });