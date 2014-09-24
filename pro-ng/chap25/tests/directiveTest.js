describe("Directive Tests", function() {
  var mockScope;
  var compileService;

  beforeEach(angular.mock.module("exampleApp05"));

  // Avant chaque test, prépare un scope contenant les données utilisées par la directive
  // et injecte le service $compile.
  beforeEach(angular.mock.inject(function($rootScope, $compile) {
    mockScope = $rootScope.$new();
    compileService = $compile;
    mockScope.data = [
      { name: "Apples", category: "Fruit", price: 1.20, expiry: 10 },
      { name: "Bananas", category: "Fruit", price: 2.42, expiry: 7 },
      { name: "Pears", category: "Fruit", price: 2.02, expiry: 6 }
    ];
  }));

  it("Generates list elements", function () {
    // Execute la directive programmatiquement sur le scope qu'on a préparé.
    var compileFn = compileService("<div unordered-list='data'></div>");
    var elem = compileFn(mockScope);
    expect(elem.children("ul").length).toEqual(1);
    expect(elem.find("li").length).toEqual(3);
    expect(elem.find("li").eq(0).text()).toEqual("Apples");
    expect(elem.find("li").eq(1).text()).toEqual("Bananas");
    expect(elem.find("li").eq(2).text()).toEqual("Pears");
  });

});