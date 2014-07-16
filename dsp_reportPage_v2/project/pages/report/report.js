var dspApp = angular.module('dspApp');

dspApp.controller('reportPageController', function($scope) {
	// 标题
	$scope.title = '活动报表';

	// 读取状态
	$scope.isLoading = false;
});

dspApp.directive('report', function() {
	return {
		restrict: 'E',
		templateUrl: 'pages/report/report.tmpl',
		controller: 'reportPageController',
		scope: true,
		replace: true
	}
});