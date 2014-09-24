describe("Filter Tests", function() {
  var filterInstance;

  beforeEach(angular.mock.module("exampleApp04"));

  // Instancie le filtre programmatiquement avant chaque test grâce au service $filter.
  beforeEach(angular.mock.inject(function($filter) {
    filterInstance = $filter("labelCase");
  }));

  // Test le filtre instancié.
  it("Changes case", function() {
    var result = filterInstance("test phrase");
    expect(result).toEqual("Test phrase");
  });

  it("Reverse case", function() {
    var result = filterInstance("test phrase", true);
    expect(result).toEqual("tEST PHRASE");
  });

});