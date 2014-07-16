var app = angular.module('dspApp');

app.controller('SelectPadController', function($scope) {
	$scope.selectList = [
		'朱古力新地',
		'麦辣鸡腿汉堡',
		'麦辣鸡翅',
		'薯条',
		'麦乐鸡'
	];
	var selectedItems = $scope.selectedItems = [];
	$scope.isSelectListOpened = false;

	// 显示选择modal
	$scope.openSelectList = function() {
		$scope.isSelectListOpened = true;
	}

	// 隐藏
	$scope.closeSelectList = function() {
		$scope.isSelectListOpened = false;
	}

	// 删除已选
	$scope.deleteSelected = function(item) {
		rg.deleteFromArray(selectedItems, item);
	}

});

app.directive('selectPad', function() {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'components/selectPad/selectPad.tmpl',
		controller: 'SelectPadController'
	};
});