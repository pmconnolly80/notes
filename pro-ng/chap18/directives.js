angular.module("exampleApp")
  .directive("triButton", function () {
    return {
      scope: { counter: "=counter" },
      link: function (scope, element, attrs) {
        // NB. Ce event handler intercepte les clics sur le <div>
        // qui encadre les boutons (auquel la directive a été appliquée),
        // pas sur les boutons eux-mêmes ! On récupère une référence
        // au bouton cliqué grâce à "event.target".
        element.on("click", function (event) {
          console.log("Button click: " + event.target.innerText);
          scope.$apply(function () {
            scope.counter++;
          });
        });
      }
    }
  });