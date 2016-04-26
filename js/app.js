var demo = angular.module('demo', []);

demo.controller('mainCtrl', function($scope, $http){
	init();
	function init(){
		$http.get('persons.json').success(function(res){
			console.log(res);
		}).error(function(err){
			alert(err);
		})
	}
});

