describe("Controller Test 01", function() {
  // Arrange
  var mockScope = {};
  var controller;

  // Référence notre module.
  beforeEach(angular.mock.module("exampleApp01"));

  // Initialise le backend en définissant les requêtes attendues du composant à tester
  // et les réponses correspondantes.
  beforeEach(angular.mock.inject(function ($httpBackend) {
    backend = $httpBackend;
    // Le backend attend une requête GET sur l'URL "productData.json".
    backend.expect("GET", "productData.json").respond(
    [{ "name": "Apples", "category": "Fruit", "price": 1.20 },
    { "name": "Bananas", "category": "Fruit", "price": 2.42 },
    { "name": "Pears", "category": "Fruit", "price": 2.02 }]);
  }));

  // Notez qu'on injecte une dépendance supplémentaire ($http)
  // pour pouvoir la passer au contrôleur.
  beforeEach(angular.mock.inject(function($controller, $rootScope, $http) {
    mockScope = $rootScope.$new();
    // Initialise le contrôleur (qui va émettre une requête HTTP GET).
    controller = $controller("defaultCtrl", {
      $scope: mockScope,
      $http: $http
    });
    // Déclenche la réponse à la requête émise par le contrôleur.
    // Si besoin, on aurait pu attendre un peu (timeout) avant d'envoyer la réponse.
    backend.flush();
  }));

  // Teste le backend.
  it("Verifies that all of the requests defined via the expect api were made", function () {
    backend.verifyNoOutstandingExpectation();
  });
  it("Processes the data", function () {
    expect(mockScope.products).toBeDefined();
    expect(mockScope.products.length).toEqual(3);
  });
  it("Preserves the data order", function () {
    expect(mockScope.products[0].name).toEqual("Apples");
    expect(mockScope.products[1].name).toEqual("Bananas");
    expect(mockScope.products[2].name).toEqual("Pears");
  });
});
