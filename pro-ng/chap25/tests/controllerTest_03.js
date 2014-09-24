describe("Controller Test 03", function() {
  // Arrange
  var mockScope, controller, mockLog;

  // Référence notre module.
  beforeEach(angular.mock.module("exampleApp03"));

  // Instancie le contrôleur en lui passant les services mock.
  beforeEach(angular.mock.inject(function($controller, $rootScope, $log) {
    
    mockScope = $rootScope.$new();
    mockLog = $log;

    $controller("defaultCtrl", {
      $scope: mockScope,
      $log: mockLog
    });

  }));

  it("Writes the right amount of error messages", function() {
    expect(mockLog.error.logs.length).toEqual(2);
  });

});