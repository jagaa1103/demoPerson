var demo = angular.module('demo', ['ui.bootstrap', 'chart.js']);

demo.controller('mainCtrl', function($scope, $http, $uibModal, $timeout){
	
	$scope.data = [];
	$scope.labels = [];
	$scope.persons = [];
	// $scope.series = ['Age'];

	

	init();
	function init(){
		$http.get('persons.json').success(function(res){
			console.log(res);
			$scope.persons = res;
		}).error(function(err){
			alert(err);
		})

	}

	$scope.$watch('persons.length', function(){
		$scope.dump = JSON.stringify($scope.persons);
		if($scope.persons.length){
			$timeout(function(){
				showGraph();	
			}, 1000);
		}
	})

	function showGraph(){
		var data = [];
		var labels = [];
		$scope.persons.forEach(function(person){
			if(!isNaN(parseInt(person.age))){
				data.push(parseInt(person.age));
				labels.push(person.name);	
			}
		});
		// $scope.labels = labels;
		// 	$scope.data = data;
		  $scope.labels = labels;
		  $scope.series = ['Age'];
		  $scope.data.push(data);
	}


	$scope.delete = function(index){
		$scope.persons.splice(index, 1);
	}

	$scope.open = function (size) {

	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'myModal.html',
	      controller: 'ModalCtrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (person) {
	      $scope.persons.push(person);
	    }, function () {
	      console.log('Modal dismissed');
	    });
	}
});

demo.controller('ModalCtrl', function ($scope, $uibModalInstance, items) {

  $scope.person = null;
  $scope.ok = function (person) {
  	console.log(person)
  	if($scope.person){
  		$uibModalInstance.close($scope.person);	
  	}else{
  		alert("Please insert info");
  	}
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

