var app = angular.module('dspApp');

app.controller('RightSideBarController', function($scope, reportService, layoutService) {
	/*
	$scope.isSlim = true;

	$scope.toggleSlim = function() {
		if (layoutService.isRightCrushing) {
			return;
		}
		$scope.isSlim = !$scope.isSlim;
	}
	*/

	$scope.triggerFloat = function() {
		if (layoutService.leftStatus === 'slim') {
			layoutService.leftStatus === 'float';
//			layoutService.setLeftStatus('float');
		}
	};

	$scope.triggerSlim = function() {
		layoutService.leftStatus === 'slim';
	};

	$scope.triggerCrush = function() {
		layoutService.leftStatus === 'crush';

	}
})

app.directive('rightSideBar', function() {
	return {
		restrict: 'E',
		controller: 'RightSideBarController',
		templateUrl: 'components/rightSideBar/rightSideBar.tmpl',
		scope: true,
		replace: true
	};
});