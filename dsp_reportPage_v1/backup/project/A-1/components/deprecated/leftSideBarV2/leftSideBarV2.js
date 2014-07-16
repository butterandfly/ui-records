var app = angular.module('dspApp');

app.controller('LeftSideBarControllerV2', function($scope, reportService, layoutService) {
	var s = $scope;
	// 向layoutService注册
	layoutService.leftBar = s;

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
		if(layoutService.leftBar.status === 'crush') {
			layoutService.leftBar.status = 'slim';
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

app.directive('leftSideBarV2', function() {
	return {
		restrict: 'E',
		controller: 'LeftSideBarControllerV2',
		templateUrl: 'components/leftSideBarV2/leftSideBarV2.tmpl',
		scope: true,
		replace: true
	};
});
