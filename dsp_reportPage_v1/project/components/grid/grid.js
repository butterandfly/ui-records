var dspApp = angular.module('dspApp');

dspApp.controller('GridController', function($scope, gridDataService, layoutService) {
	// 数据
	$scope.rows = gridDataService.getGridData();
	// 标题
	$scope.title = '活动报表';
	// 表头
	$scope.reportIndexes = gridDataService.getGridIndexes();
	// 读取状态
	$scope.isLoading = false;

});

dspApp.directive('grid', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/grid/grid.tmpl',
		controller: 'GridController',
		scope: true
	}
});
