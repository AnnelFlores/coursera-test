(function () {
    'use strict';
  
    // Declarar el módulo
    angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
    // Inyección de dependencias protegida
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      const toBuyCtrl = this;
  
      // Inicializar con los artículos por comprar
      toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();
  
      // Mover artículo a "Ya comprados"
      toBuyCtrl.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
      };
    }
  
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      const boughtCtrl = this;
  
      // Obtener artículos "Ya comprados"
      boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
    }
  
    function ShoppingListCheckOffService() {
      const service = this;
  
      // Listas internas
      const toBuyItems = [
        { name: "Cookies", quantity: 10 },
        { name: "Milk", quantity: 2 },
        { name: "Bread", quantity: 1 },
        { name: "Apples", quantity: 5 },
        { name: "Soda", quantity: 6 }
      ];
  
      const boughtItems = [];
  
      // Obtener artículos "Por comprar"
      service.getToBuyItems = function () {
        return toBuyItems;
      };
  
      // Obtener artículos "Ya comprados"
      service.getBoughtItems = function () {
        return boughtItems;
      };
  
      // Mover artículo de "Por comprar" a "Ya comprados"
      service.buyItem = function (itemIndex) {
        const item = toBuyItems.splice(itemIndex, 1)[0];
        boughtItems.push(item);
      };
    }
  })();
  