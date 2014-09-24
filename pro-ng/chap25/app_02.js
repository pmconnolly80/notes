angular.module("exampleApp02", [])
  .controller("defaultCtrl", function($scope, $interval, $timeout) {

    $scope.intervalCounter = 0;
    $scope.timerCounter = 0;

    // Incrémente le compteur toutes les 5 secondes, 10 fois en tout.
    // Dans les tests, $interval.flush(millis) permet d'avancer le temps de millis millisecondes
    // pour déclencher l'exécution de la fonction.
    $interval(function() {
      $scope.intervalCounter++;
    }, 5000, 10);

    // Incrémente le compteur (une fois) au bout de 5 secondes.
    // Dans les tests, $timeout.flush() permet de faire expirer le timeout.
    $timeout(function() {
      $scope.timerCounter++;
    }, 5000);

  });