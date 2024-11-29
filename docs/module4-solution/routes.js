(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home if no other route is matched
        $urlRouterProvider.otherwise('/');

        // Define states
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.template.html'
        })
        .state('categories', {
            url: '/categories',
            template: '<categories categories="$resolve.categories"></categories>',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            template: '<items items="$resolve.items"></items>',
            resolve: {
                items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
})();
