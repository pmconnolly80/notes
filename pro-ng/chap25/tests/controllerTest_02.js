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

    it("Limits interval to 10 updates", function() {
      // Fais avancer le temps de 5 secondes, 11 fois,
      // de sorte que le $interval du contrôleur aura déclenché toutes ses exécutions.
      for (var i = 0; i < 11; i++) {
        mockInterval.flush(5000);
      }
      expect(mockScope.intervalCounter).toEqual(10);
    });

    it("Increments timer counter", function() {
      // Retire 5 secondes au délai du timeout, ce qui le fait expirer.
      mockTimeout.flush(5000);
      expect(mockScope.timerCounter).toEqual(1);
    });

  }));
});