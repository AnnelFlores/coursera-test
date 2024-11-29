(function() {
    angular.module('restaurantApp', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider
          .when('/signUp', {
            templateUrl: 'signUp.html',
            controller: 'SignUpController'
          })
          .when('/myInfo', {
            templateUrl: 'myInfo.html',
            controller: 'MyInfoController'
          })
          .otherwise({
            redirectTo: '/signUp'
          });
      })
  
      .controller('MainController', function($scope, $location) {
        $scope.goToSignUp = function() {
          $location.path('/signUp');
        };
        
        $scope.goToMyInfo = function() {
          $location.path('/myInfo');
        };
      })
  
      .controller('SignUpController', function($scope, $http, userInfoService) {
        $scope.user = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          favoriteDish: ''
        };
        $scope.errorMessage = '';
  
        $scope.submitForm = function() {
          if ($scope.signUpForm.$valid) {
            let menuNumber = $scope.user.favoriteDish;
            $http.get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/${menuNumber}.json`)
              .then(function(response) {
                if (response.data === null) {
                  $scope.errorMessage = "No such menu number exists.";
                } else {
                  userInfoService.saveUserInfo($scope.user);
                  $scope.successMessage = "Your information has been saved.";
                }
              })
              .catch(function() {
                $scope.errorMessage = "Error retrieving menu item.";
              });
          }
        };
      })
  
      .controller('MyInfoController', function($scope, userInfoService) {
        $scope.user = userInfoService.getUserInfo();
        if (!$scope.user.firstName) {
          $scope.message = "Not Signed Up Yet. <a href='#/signUp'>Sign up Now!</a>";
        } else {
          $scope.message = `Welcome ${$scope.user.firstName}!`;
        }
      })
  
      .service('userInfoService', function() {
        var userInfo = {};
  
        this.saveUserInfo = function(info) {
          userInfo = info;
        };
  
        this.getUserInfo = function() {
          return userInfo;
        };
      });
  })();
  