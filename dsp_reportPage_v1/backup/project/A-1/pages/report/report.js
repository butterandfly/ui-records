var dspApp = angular.module('dspApp');

dspApp.controller('reportPageController', function($scope, reportService) {
	// ------- 伪数据 -------
	var row = {
		id: 10007,
		name: '小苹果',
		showCount: 77,
		clickCount: 7,
		clickRate: '9%',
		BShowCount: 107,
		reachRate: '17%',
		registerRate: '7%',
		BRegisterRate: '7%'
	};

	var rows = [];
	var i;
	for(i = 0; i < 20; i++) {
		rows.push(angular.copy(row));
	}
	// ------- -------

	// 数据
	$scope.rows = rows;
	// 标题
	$scope.title = '活动报表';
	// 表头
	$scope.reportIndexes = [
		{key: 'id', name: 'ID', hasSearch: true},
		{key: 'name', name: '活动名', hasSearch: true},
		{key: 'showCount', name: '活动展示量', hasIndexFilter: true},
		{key: 'clickCount', name: '点击量', hasIndexFilter: true},
		{key: 'clickRate', name: '点击率'},
		{key: 'BShowCount', name: 'B_展示量'},
		{key: 'reachRate', name: '点击到达率'},
		{key: 'registerRate', name: '注册量'},
		{key: 'BRegisterRate', name: 'B_注册率'}
	];
	// 读取状态
	$scope.isLoading = false;
	// 受到右边挤压

	// 向report service注册该页面
	reportService.registerPage($scope);


	// 该方法刷新数据
	$scope.loadData = function() {
		$scope.isLoading = true;

		// 以下代码用于模拟读取成功的效果
		setTimeout(function(){
			$scope.rows = [];
			for(i = 0; i < 7; i++) {
				$scope.rows.push(angular.copy(row));
			}

			$scope.isLoading = false;
			$scope.$apply();
		}, 2000);
	}
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