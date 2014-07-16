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

var app = angular.module('dspApp');

app.controller('GridModalController', function($scope, $timeout, layoutService, gridModalLayoutService) {
	var s = $scope;

	layoutService.gridModal = s;

	s.modalLayout = gridModalLayoutService;
	s.isActive = false;
	s.isTipping = false;

	s.toggleActive = function() {
		s.isActive = !s.isActive;
	};

	s.openSubgrid = function() {
		// TODO: 添加一个表格

		// 打开gridModal
		s.isActive = true;
	};

	s.addSubgrid = function() {
		// TODO: 添加一个表格

		// gridModal做响应
		s.isTipping = true;
		$timeout(function() {
			s.$apply(function() {
				s.isTipping = false;
			});
		}, 550);
	}

	// TODO: 该controller销毁时将layoutService的gridModal设置为null；或许应该在layoutService中执行
})

app.directive('gridModal', function() {
	return {
		restrict: 'E',
		controller: 'GridModalController',
		templateUrl: 'components/gridModal/gridModal.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
		}
	};
});

dspApp.service('gridModalLayoutService', function($rootScope) {
	this.leftBar = null;
	this.rightBar = null;

	var self = this;
	$rootScope.gridModalLayoutService = this;

	// 检测left的状态，crush的时候将右边slim
	$rootScope.$watch('gridModalLayoutService .leftBar.status', function(newVal, oldVal) {
		if (newVal === 'crush' && self.rightBar) {
			self.rightBar.status = 'slim';
		}
	});
	// 跟上面相反
	$rootScope.$watch('gridModalLayoutService .rightBar.status', function(newVal, oldVal) {
		if (newVal === 'crush' && self.leftBar) {
			self.leftBar.status = 'slim';
		}
	});
});

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




angular.module('dspApp')
	.controller('ReportFilterIntroCtrler', function($scope) {
	})
	.directive('reportFilterIntro', function() {
		return {
			restrict: 'E',
			controller: 'ReportFilterIntroCtrler',
			templateUrl: 'components/reportFilterIntro/reportFilterIntro.tmpl'
		}
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

app.controller('SideBarController', function($scope, $injector, $interval) {


	var s = $scope;
	s.init = function(side, serviceName, status) {
		s.side = side;
		s.status = status;

		// 向service注册
		s.layoutService = $injector.get(serviceName);
		s.layoutService[side + 'Bar'] = s;
	}

	s.toggleCrush = function() {
		if (s.status === 'crush') {
			s.cancelCrush();
			s.status = 'slim';
		} else {
			s.status = 'crush';
		}
	}

	var timer;
	// 鼠标离开与进入slim的事件
	s.mouseenterSlim = function() {
		// 开始一次性计时器
		timer = $interval(function(){
			s.status = 'float';
		}, 200, 1);
	}

	s.mouseleaveSlim = function() {
		// 取消计时器
		if (timer) {
			$interval.cancel(timer);
		}
	}

	// 鼠标离开内容区的事件
	s.mouseleaveBar = function() {
		if (s.status === 'float') {
			s.status = 'slim';
		}
	}

	s.isCancelCrushShowed = false;
})

app.directive('sideBar', function() {
	return {
		restrict: 'E',
		controller: 'SideBarController',
		templateUrl: 'components/sideBar/sideBar.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
			var side = attrs.side || 'left';
			var service = attrs.service || 'layoutService';
			var status = attrs.status || 'slim';

			scope.init(side, service, status);
		}
	};
});

var app = angular.module('dspApp');

app.directive('topNav', function() {
	return {
		scope: true,
		templateUrl: 'components/topNav/topNav.tmpl',
		restrict: 'E'
	}
});
angular.module('dspApp').directive('popover', function($timeout, layoutService, mouseLocationService) {
	return {
		restrict: 'E',
		templateUrl: 'components/grid/popover/popover.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
			var s = scope;
			s.isPoping = false;

			s.togglePop = function() {
				s.isPoping = !s.isPoping;
			}
		}
	};
});
angular.module('dspApp')
	.controller('SubgridButtonController', function($scope, $timeout, layoutService) {
		var s = $scope;

		s.hasLongClick = false;
	})

app.directive('subgridButton', function($timeout, layoutService, mouseLocationService) {
	return {
		restrict: 'E',
		controller: 'SubgridButtonController',
		templateUrl: 'components/grid/subgridButton/subgridButton.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
			var btn = element.find('.sub-grid-btn');
			var shadow = element.find('.sub-grid-btn-shadow');

			scope.openSubgrid = function() {
				layoutService.gridModal.openSubgrid();
			}

			// TODO: 实验性地使用mouseLocationService代替$event，一段时间后请反馈这种用法
			scope.addSubgrid = function($event) {
				doShadowAnimate();

				layoutService.gridModal.addSubgrid();
			}

			// 该方法执行shadow的动画
			function doShadowAnimate() {
				// 将shadow的位置设置为鼠标的位置
				shadow.css({
					'top': mouseLocationService.getClientY(),
					'left': mouseLocationService.getClientX()
				})

				// 设置为长按状态
				scope.hasLongClick = true;
				// 1秒后取消长按状态
				$timeout(function() {
					scope.$apply(function() {
						scope.hasLongClick = false;
					});
				}, 1000)
			}
		}
	};
});
angular.module('dspApp')
	.directive('sideNav', function() {
		return {
			templateUrl: 'components/navSideBar/sideNav/sideNav.tmpl',
			scope: 'true',
			restrict: 'E',
			controller: 'SideNavController',
			link: function(scope, element) {
			}
		};
	})

	.controller('SideNavController', function($scope) {
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
	})

//	.directive('navSearch', function() {
//		return {
//			restrict: 'E',
//			templateUrl: 'components/leftSideBar/navSearch.tmpl',
//			scope: true,
//			replace: true,
//			link: function(scope, element, attrs) {
//				var data = scope.$eval(attrs.rgData);
//
//				scope.list = data.list;
//				scope.isSearching =false;
//				scope.keyword = '';
//
//				/*
//				 element.find('input').bind('keypress', function(ev){
//				 if(scope.keyword != '') {
//				 scope.isSearching = true;
//				 } else {
//				 scope.isSearching = false;
//				 }
//				 })
//				 */
//			}
//		};
//	});

angular.module('dspApp').directive('fullYButton', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/sideBar/fullYButton/fullYButton.tmpl',
		transclude: true,
		link: function(scope, element, attrs) {
		}
	};
});
angular.module('dspApp').directive('linkGroup', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/navSideBar/sideNav/linkGroup/linkGroup.tmpl',
		scope: true,
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