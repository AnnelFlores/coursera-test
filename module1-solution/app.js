(function() {
    'use strict';
  
    angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);
  
    LunchCheckController.$inject = ['$scope'];
  
    function LunchCheckController($scope) {
      $scope.lunchItems = ""; // Variable para almacenar los artículos ingresados
      $scope.message = ""; // Variable para almacenar el mensaje a mostrar
  
      // Función para comprobar si la lista de almuerzo tiene demasiados artículos
      $scope.checkLunch = function() {
        // Se divide la cadena en un array utilizando las comas
        var items = $scope.lunchItems.split(',');
  
        // Se filtran los elementos vacíos (en caso de que haya comas consecutivas o espacios)
        var itemCount = items.filter(function(item) {
          return item.trim() !== ''; // Filtra los artículos vacíos
        }).length;
  
        // Comprobamos el número de artículos y asignamos el mensaje adecuado
        if (itemCount === 0) {
          $scope.message = "Por favor ingresa datos primero"; // Si no hay artículos
        } else if (itemCount <= 3) {
          $scope.message = "¡Disfruta!"; // Si hay 3 o menos artículos
        } else {
          $scope.message = "¡Demasiado!"; // Si hay más de 3 artículos
        }
      };
    }
  })();
  