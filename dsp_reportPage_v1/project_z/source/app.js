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
					$animate.addClass(element, "animated fadeInRight", function() {
						element.removeClass('animated fadeInRight');
					});
				} else {
					// 先显示动画
					$animate.addClass(element, "animated fadeOutRight", function() {
						element.removeClass('animated fadeOutRight');
						// 再删除hide类
						element.addClass('hide');
					});
				}
			});
		}
	}
});

/*
Z.controller('reportFilterIntro', {
	templatePath:	'components/reportFilterIntro/reportFilterIntro.tmpl',
	buildContext: function() {
		return {};
	},
	afterBuild: function(elm) {
		elm.on('click', function() {
			var filter = $('#report-filter');
//			filter.addClass('animated', 'fadeInRight');
			filter.addClass('animated fadeInRight');
			filter.removeClass('hide');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('hide');
				filter.removeClass('animated fadeInRight');
			});
		});
	}
});
*/

var app = angular.module('dspApp');

app.controller('ReportFilterIntroCtrler', function($scope, reportService) {
	reportService.registerFilterIntro($scope);

	$scope.openFilter = function() {
		reportService.filter.open();
	}
});

app.directive('reportFilterIntro', function() {
	return {
		restrict: 'E',
		controller: 'ReportFilterIntroCtrler',
		templateUrl: 'components/reportFilterIntro/reportFilterIntro.tmpl'
	}
});

var app = angular.module('dspApp');

app.controller('RightSideBarController', function($scope, reportService, layoutService) {
	$scope.isSlim = true;

	$scope.toggleSlim = function() {
		if (layoutService.isRightCrushing) {
			return;
		}
		$scope.isSlim = !$scope.isSlim;
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
var app = angular.module('dspApp');

app.controller('LeftSideBarController', function($scope, reportService, layoutService) {
	$scope.isSlim = true;

	$scope.navList = [
		{text: '概述', link: ''},
		{text: 'South Park', subList: [
			{text: 'Kenny', link: '#'},
			{text: 'Eric', link: '#'},
			{text: 'Stan', link: '#'},
			{text: 'Kyle', link: '#'}
		]},
		{text: 'The Avengers', subList: [
			{text: 'Spider Man', link: '#'},
			{text: 'Iron Man', link: '#'},
			{text: 'Captain America', link: '#'},
			{text: 'Black Widow', link: '#'},
			{text: 'Thor', link: '#'}
		]}
	];

	$scope.toggleSlim = function() {
		if (layoutService.isLeftCrushing) {
			return;
		}
		$scope.isSlim = !$scope.isSlim;
	}

	$scope.toggleLeftCrushing = function() {
		layoutService.isLeftCrushing = !layoutService.isLeftCrushing;
	}
})

app.directive('leftSideBar', function() {
	return {
		restrict: 'E',
		controller: 'LeftSideBarController',
		templateUrl: 'components/leftSideBar/leftSideBar.tmpl',
		scope: true,
		replace: true
	};
});

app.directive('linkGroup', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/leftSideBar/linkGroup.tmpl',
		scope: true,
		replace: true,
		link: function(scope, element, attrs) {
			var data = scope.$eval(attrs.rgData);

			scope.title = data.title;
			scope.listCtrler = createRadiableListCtrler(data.list, data.selected);

			scope.isSubOpened = false;
			scope.toggleSub = function() {
				scope.isSubOpened = !scope.isSubOpened;
			}
		}
	};
});

app.directive('navSearch', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/leftSideBar/navSearch.tmpl',
		scope: true,
		replace: true,
		link: function(scope, element, attrs) {
			var data = scope.$eval(attrs.rgData);

			scope.list = data.list;
			scope.isSearching =false;
			scope.keyword = '';

			/*
			element.find('input').bind('keypress', function(ev){
				if(scope.keyword != '') {
					scope.isSearching = true;
				} else {
					scope.isSearching = false;
				}
			})
			*/
		}
	};
});
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
var app = angular.module('dspApp');

app.directive('topNav', function() {
	return {
		scope: true,
		replace: true,
		templateUrl: 'components/topNav/topNav.tmpl',
		restrict: 'E'
	}
});