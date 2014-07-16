/*
Z.controller('reportFilter', {
	templatePath: 'components/reportFilter/reportFilter.tmpl',
	buildContext: function() {
		return {}
	},
	afterBuild: function(elm) {
		var filter = elm;

		// 确认过滤
		elm.find('.button-filter').on('click', function() {
			filter.addClass('fadeOutRight animated');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('fadeOutRight animated');
				filter.addClass('hide');
			});
		});
	}
});
*/

var app = angular.module('dspApp');

app.controller('ReportFilterCtrler', function($scope, reportService) {
	reportService.registerFilter($scope);

	$scope.isHidden = true;

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

	$scope.open = function() {
		$scope.isHidden = false;
	};

	$scope.close = function() {
		$scope.isHidden = true;
	};

	$scope.doFilter = function() {
		reportService.page.loadData();
	}

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

// 依赖animate.css
app.directive('animateShow', function($animate) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var defaultIn = 'fadeIn';
			var defaultOut = 'fadeOut';

			var inClass = attrs.animateShowIn;
			if (!inClass) {
				inClass = defaultIn;
			}

			var outClass = attrs.animateShowOut;
			if (!outClass) {
				outClass = defaultOut;
			}

			scope.$watch(attrs.animateShow, function (newValue, oldValue) {
				if (newValue === oldValue) {
					// 使得一开始直接出现（或隐藏），跳过动画
					newValue ? element.removeClass('hide') : element.addClass('hide');
					return;
				}

				if (newValue) {
					// 先删除hide类
					element.removeClass('hide');
					// 再显示动画
					$animate.addClass(element, 'animated ' + inClass, function() {
						element.removeClass('animated ' + inClass);
					});
				} else {
					// 先显示动画
					$animate.addClass(element, 'animated ' + outClass, function() {
						element.removeClass('animated ' + outClass);
						// 再删除hide类
						element.addClass('hide');
					});
				}
			});
		}
	}
});

// 依赖animate.css
app.directive('animateOn', function($animate) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var defaultIn = 'fadeIn';
			var defaultOut = 'fadeOut';

			var inClass = attrs.animateOnIn;
			if (!inClass) {
				inClass = defaultIn;
			}

			var outClass = attrs.animateOnOut;
			if (!outClass) {
				outClass = defaultOut;
			}

			scope.$watch(attrs.animateOn, function (newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				if (newValue) {
					$animate.addClass(element, 'animated ' + inClass, function() {
						element.removeClass('animated ' + inClass);
					});
				} else {
					$animate.addClass(element, 'animated ' + outClass, function() {
						element.removeClass('animated ' + outClass);
					});
				}
			});
		}
	}
});