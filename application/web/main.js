'use strict';

(function() {

	var MODULE = angular.module('osgi.enroute.examples.m2e',
			[ 'ngRoute', 'ngResource' ]);

	MODULE.config( function($routeProvider) {
		$routeProvider.when('/', { controller: mainProvider, templateUrl: '/osgi.enroute.examples.m2e/main/htm/home.htm'});
		$routeProvider.when('/about', { templateUrl: '/osgi.enroute.examples.m2e/main/htm/about.htm'});
		$routeProvider.otherwise('/');
	});
	
	MODULE.run( function($rootScope, $location) {
		$rootScope.alerts = [];
		$rootScope.closeAlert = function(index) {
			$rootScope.alerts.splice(index, 1);
		};
		$rootScope.page = function() {
			return $location.path();
		}
	});
	
	var answers = [ ];
	
	
	
	var mainProvider = function($scope, $http) {
		$scope.answers=answers;
		
		$scope.eval = function(expr) {
				$http.get('/rest/eval/'+expr).then(
						function(d) {
							answers.push(d.data + " = " + expr);
						}, function(d) {
							$scope.alerts.push( { type: 'danger', msg: 'Failed with ['+ d.status + '] '+ d.statusText });
						}
				);
		}
	}
	
})();
