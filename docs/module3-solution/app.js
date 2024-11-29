(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective);
  
    // Controller
    function NarrowItDownController(MenuSearchService) {
      var vm = this;
      vm.found = [];
  
      vm.narrowItDown = function () {
        if (vm.searchTerm) {
          MenuSearchService.getMatchedMenuItems(vm.searchTerm)
            .then(function (response) {
              vm.found = response;
            })
            .catch(function (error) {
              console.error("Error occurred:", error);
            });
        }
        else {
          vm.found = [];
        }
      };
  
      vm.removeItem = function (index) {
        vm.found.splice(index, 1);
      };
    }
  
    // Service
    function MenuSearchService($http) {
      this.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
        })
        .then(function (result) {
          var items = result.data;
          var foundItems = [];
          for (var key in items) {
            if (items[key].description.indexOf(searchTerm) !== -1) {
              foundItems.push(items[key]);
            }
          }
          return foundItems;
        });
      };
    }
  
    // Directive
    function FoundItemsDirective() {
      var ddo = {
        template: `
          <ul>
            <li ng-repeat="item in found">
              {{ item.name }} ({{ item.short_name }}) - {{ item.description }}
              <button ng-click="remove(item)">Don't want this one!</button>
            </li>
          </ul>`,
        scope: {
          found: '<',
          remove: '&'
        }
      };
      return ddo;
    }
  })();
  