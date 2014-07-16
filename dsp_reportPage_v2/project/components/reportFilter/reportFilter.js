var app = angular.module('dspApp');

app.controller('ReportFilterCtrler', function($scope) {
	// 纬度种类
	var latTypeList = $scope.latTypeList = [
		{text: '单个', value: 'single', isSelected: true},
		{text: '组合', value: 'comb', isSelected: false}
	];

	// 日期种类
	var dateTypeList = $scope.dateTypeList = [
		{text: '今日', value: 'today', isSelected: true},
		{text: '昨日', value: 'yestoday', isSelected: false},
		{text: '近7日', value: 'sevenDay', isSelected: false}
	];

	// 活动类型
	var campTypeList = $scope.campTypeList  = [
		{text: 'pc广告', value: 'pc', isSelected: true},
		{text: '移动广告', value: 'mobile', isSelected: false},
		{text: '广告监测', value: 'monitor', isSelected: false}
	];

	// 状态类型
	var statusTypeList = $scope.statusTypeList   = [
		{text: '所有', value: 'all', isSelected: true},
		{text: '进行中', value: 'running', isSelected: false},
		{text: '已暂停', value: 'pause', isSelected: false},
		{text: '未开始', value: 'notStart', isSelected: false},
		{text: '已结束', value: 'end', isSelected: false}
	];

	// 切换为单纬度
	$scope.setSingleLat = function() {
		$scope.isComb = false;
	}

	// 切换为组合纬度
	$scope.setCombLat = function() {
		$scope.isComb = true;
	}
})

app.directive('reportFilter', function() {
	return {
		restrict: 'E',
		controller: 'ReportFilterCtrler',
		templateUrl: 'components/reportFilter/reportFilter.tmpl',
		scope: true
	};
});



