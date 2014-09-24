describe("Controller Test 00", function() {
  // Arrange
  var mockScope = {};
  var controller;

  // Référence notre module.
  beforeEach(angular.mock.module("exampleApp00"));

  // Instancie programmatiquement le contrôleur à tester
  // en y injectant toutes les dépendances dont il a besoin.
  beforeEach(angular.mock.inject(function($controller, $rootScope) {
    mockScope = $rootScope.$new();
    controller = $controller("defaultCtrl", {
      $scope: mockScope
    });
  }));

  // Act and Assess
  it("Creates variable", function() {
    expect(mockScope.counter).toEqual(0);
  });

  // Teste le compteur.
  it("Increments counter", function() {
    mockScope.incrementCounter();
    expect(mockScope.counter).toEqual(1);
  });

});
