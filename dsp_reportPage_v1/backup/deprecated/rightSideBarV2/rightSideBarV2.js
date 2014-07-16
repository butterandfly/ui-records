var app = angular.module('dspApp');

app.controller('RightSideBarControllerV2', function($scope, reportService, layoutService) {
	var s = $scope;
	// 向layoutService注册
	layoutService.rightBar = s;

	s.status = 'slim';

	$scope.slim2Float = function() {
		if (s.status === 'slim') {
			s.status = 'float';
		}
	};

	$scope.triggerSlim = function() {
		s.status = 'slim';
	};

	$scope.triggerCrush = function() {
		s.status = 'crush';
		if(layoutService.rightBar.status === 'crush') {
			layoutService.rightBar.status = 'slim';
		}
	}

	$scope.cancelCrush = function() {
		s.status = 'float';
	}

	$scope.toggleCrush = function() {
		if (s.status === 'crush') {
			$scope.cancelCrush();
		} else {
			$scope.triggerCrush();
		}
	}
})

app.directive('rightSideBarV2', function() {
	return {
		restrict: 'E',
		controller: 'RightSideBarControllerV2',
		templateUrl: 'components/rightSideBarV2/rightSideBarV2.tmpl',
		scope: true,
		replace: true
	};
});