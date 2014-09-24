angular.module("exampleApp03", [])
  .controller("defaultCtrl", function($log) {

    $log.error('Logging a dummy error message');
    
    $log.error('Logging another dummy error message');

  });