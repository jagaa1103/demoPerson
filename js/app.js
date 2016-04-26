var demo = angular.module('demo', []);

demo.controller('mainCtrl', function($scope, $http){
	
	init();
	function init(){
		$http.get('persons.json').success(function(res){
			console.log(res);
			$scope.persons = res;
		}).error(function(err){
			alert(err);
		})
	}

	$scope.$watch('persons', function(){
		$scope.dump = JSON.stringify($scope.persons);
	})
});

