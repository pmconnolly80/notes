describe("Controller Test 02", function() {
  // Arrange
  var mockScope, controller, backend, mockInterval, mockTimeout;

  // Référence notre module.
  beforeEach(angular.mock.module("exampleApp02"));

  // Instancie le contrôleur en lui passant les services mock.
  beforeEach(angular.mock.inject(function($controller, $rootScope, $interval, $timeout) {
    
    mockScope = $rootScope.$new();
    mockInterval = $interval;
    mockTimeout = $timeout;
    
    $controller("defaultCtrl", {
      $scope: mockScope,
      $interval: mockInterval,
      $timeout: mockTimeout
    });

  }));
});