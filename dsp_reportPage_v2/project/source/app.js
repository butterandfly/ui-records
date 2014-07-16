// 该服务用于提供grid的数据
angular.module('dspApp').service('gridDataService', function() {
	var gridIndexes = [
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
	for(i = 0; i < 40; i++) {
		rows.push(angular.copy(row));
	}

	this.getGridIndexes = function() {
		return gridIndexes;
	}

	this.getGridData = function() {
		return rows;
	};
})
angular.module('dspApp').service('gridModalSystem', function() {
	this.navListCtrler = null;

	this.gridModal = null;

	this.openSubgrid = function(type, rowData) {
		// 添加一个表格
		var subgrid = {
			'title': type
		};
		this.navListCtrler.list.push(subgrid);
		this.navListCtrler.selectItem(subgrid);

		// 打开gridModal
		this.gridModal.isActive = true;
	};

	/*
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
	 */
})
// 布局系统
angular.module('dspApp').service('layoutService', function($rootScope) {
	this.leftBar = null;
	this.rightBar = null;
	this.gridModal = null;

	this.isManaging = false;

	var self = this;
	$rootScope.layoutService = this;

	this.toggleManaging = function() {
		this.isManaging = !this.isManaging;
	};

	this.getOtherPageName = function() {
		return this.isManaging ? '报表页' : '后台管理';
	};
})
angular.module('dspApp')
	// 该服务用于取得鼠标点击'mousedown'时的坐标，需要配合registerMouseLocation使用；
	// TODO: 实现自定义事件，不单是mousedown
	// TODO: 对于注册的element提供单独的服务，不同的元素可能有不同值
	// TODO: 提供上一个坐标
	.service('mouseLocationService', function() {
		this.registerCount = 0;
		this.pageX = null;
		this.pageY = null;
		this.clientX = null;
		this.clientY = null;

		this.register = function() {
			this.registerCount++;
		}
		this.unRegister = function() {
			this.registerCount--;
		}

		this.getPageX = function() {

		}
		this.getPageY = function() {

		}

		this.getClientX = function() {
			return this.clientX;
		}
		this.getClientY = function() {
			return this.clientY;
		}

		this.getScreenX = function() {

		}
	})
	// 该directive与mouseLocationService配合使用
	.directive('registerMouseLocation', function(mouseLocationService) {
		return {
			restrict: 'EA',
			link: function(scope, element) {
				mouseLocationService.register();
				element.bind('mousedown', function($event) {
					mouseLocationService.pageX = $event.pageX;
					mouseLocationService.pageY = $event.pageY;

					mouseLocationService.clientX = $event.clientX;
					mouseLocationService.clientY = $event.clientY;
				});

				scope.$on('$destroy', function() {
					// 域销毁的时候取消mouseLocationService的注册
					mouseLocationService.register();
				})
			}
		}
	});
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
	var s = $scope;

	// 数据
	$scope.rows = gridDataService.getGridData();
	// 标题
	$scope.title = '活动报表';
	// 表头
	$scope.reportIndexes = gridDataService.getGridIndexes();
	// 读取状态
	$scope.isLoading = false;

	s.preselectedRow = null;

	s.isPreselectedRow = function(row) {
		if (row === s.preselectedRow) return true;
		return false;
	}

	s.preselectRow = function(row) {
		s.preselectedRow = row;
	}
	s.unPreselectRow = function() {
		s.preselectedRow = null;
	}

	// 打开子表格
	s.openSubgrid = function(type, rowData) {
		layoutService.gridModal.openSubgrid(type, rowData);
	}
});

dspApp.directive('grid', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/grid/grid.tmpl',
		controller: 'GridController',
		scope: true,
		link: function(s, element) {
			var originTable = element.find('.origin-table');
			// copyTable用来存放那个fixed的表头
			var copyTableCont = element.find('.fixed-header-cont');
			var copyTable = element.find('.fixed-header');

			//
			var scrollableDiv = element.find('.grid-scrollable');

			scrollableDiv.on('scroll', function($event) {
				var scrollX = $(this).scrollLeft();
				copyTable.css({
					'left': '-'+ scrollX + 'px'
				})
				copyTable.find('.fixed-col-1').css({
					'left': scrollX + 'px'
				});
			})

			function resizeFixed() {
				$t_fixed.find("th").each(function(index) {
					$(this).css("width",$this.find("th").eq(index).outerWidth()+"px");
				});
			}

			function scrollFixed() {
				var windowScrollTop = $(this).scrollTop();
				var offset = $(this).scrollTop(),
					tableOffsetTop = originTable.offset().top,
					tableOffsetBottom = tableOffsetTop + originTable.height() - originTable.find("thead").height();
				if((offset + 50) < tableOffsetTop || offset > tableOffsetBottom) {
					copyTableCont.hide();
				}
				else if((offset + 50) >= tableOffsetTop && (offset + 50) <= tableOffsetBottom) {
					copyTableCont.css({
						'top': $(this).scrollTop() - tableOffsetTop + 50 + 'px'
					})

					copyTableCont.show();
				}
			}

			$(window).scroll(scrollFixed);

		}
	}
});

var app = angular.module('dspApp');

app.controller('GridModalController', function($scope, layoutService, gridModalLayoutService, gridModalSystem) {
	var s = $scope;

	layoutService.gridModal = s;
	gridModalSystem.gridModal = s;

	s.modalLayout = gridModalLayoutService;
	s.isActive = false;
	s.isTipping = false;

	s.toggleActive = function() {
		s.isActive = !s.isActive;
	};
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
});

angular.module('dspApp')
	.directive('magicButton', function(layoutService, $document) {
		return {
			restrict: 'E',
			templateUrl: './components/magicButton/magicButton.tmpl',
			link: function(scope, element) {
				// 下面拖拽的代码严重参考了：http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
				// TODO: 尝试不要绑定document，参考：http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
				// TODO: 另外可以看看jquery-ui的解决方案

				function ExtractNumber(value) {
					var n = parseInt(value);
					return n == null || isNaN(n) ? 0 : n;
				}

				function $(id) {
					return document.getElementById(id);
				}

				var _startX = 0;            // mouse starting positions
				var _startY = 0;
				var _offsetX = 0;           // current element offset
				var _offsetY = 0;
				var _dragElement;
				var mouseDownTime;

				function OnMouseDown(e) {
					var target = e.target;

					if (target.className == 'main-btn') {
						// 记录当前时间
						mouseDownTime = e.timeStamp;

						// grab the mouse position
						_startX = e.clientX;
						_startY = e.clientY;

						// grab the clicked element's position
						_offsetX = ExtractNumber(target.style.left);
						_offsetY = ExtractNumber(target.style.top);

						// we need to access the element in OnMouseMove
						_dragElement = target;

						// tell our code to start moving the element with the mouse
						document.onmousemove = OnMouseMove;

						// cancel out any text selections
						document.body.focus();

						// prevent text selection (except IE)
						return false;
					}
				}

				function OnMouseUp(e) {
					if (_dragElement != null) {
						document.onmousemove = null;
						document.onselectstart = null;
						_dragElement.ondragstart = null;

						// this is how we know we're not dragging
						_dragElement = null;

						var mouseUpTime = e.timeStamp;
						if ((mouseUpTime - mouseDownTime) < 200 ) {
							scope.$apply(function() {
								scope.openGridModal();
							});
						}
					}
				}

				function OnMouseMove(e) {
					_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
					_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
				}

				document.onmousedown = OnMouseDown;
				document.onmouseup = OnMouseUp;

				/////////////////////////////////////////

				// 打开gridModal
				scope.openGridModal = function() {
					layoutService.gridModal.isActive = !layoutService.gridModal.isActive;
				}
			}
		}
	})

angular.module('dspApp')
	.directive('manageCenter', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/manageCenter/manageCenter.tmpl',
			scope: true,
			link: function(s, element) {
			}
		}
	});
angular.module('dspApp')
	.directive('modalGrid', function() {
		return {
			restrict: 'E',
			scope: {
				currentGrid: '='
			},
			controller: function($scope, layoutService) {

			},
			templateUrl: 'components/modalGrid/modalGrid.tmpl'
		}
	})

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
	.controller('SubgridButtonController', function($scope) {
		var s = $scope;

		s.hasLongClick = false;
	})

app.directive('subgridButton', function($timeout, gridModalSystem, mouseLocationService) {
	return {
		restrict: 'E',
		controller: 'SubgridButtonController',
		templateUrl: 'components/grid/subgridButton/subgridButton.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
			var s = scope;
			// 子表格类型
			s.type = attrs.type;
			// 按钮图标
			s.icon = attrs.icon

			// 打开子表格
			s.openSubgrid = function() {
				gridModalSystem.openSubgrid(s.type, s.rowData);
			}

			//////////////// 下面是添加子表格的内容

			var btn = element.find('.sub-grid-btn');
			var shadow = element.find('.sub-grid-btn-shadow');
			// TODO: 实验性地使用mouseLocationService代替$event，一段时间后请反馈这种用法
//			scope.addSubgrid = function() {
//				doShadowAnimate();
//
//				layoutService.gridModal.addSubgrid();
//			}

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
	.directive('subgridButtonGroup', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/grid/subgridButtonGroup/subgridButtonGroup.tmpl',
			scope: {
				'showBtns': '@',
				'rowData': '@',
				'gridInfo': '@'
			},
			transclude: true,
			link: function(scope, element, attrs) {
			}
		};
	});
angular.module('dspApp').directive('gridNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/gridModal/gridNav/gridNav.tmpl',
		scope: true,
		transclude: true,
		controller: function($scope, gridModalSystem) {
			$scope.navList = [];
			gridModalSystem.navListCtrler = $scope.listCtrler = {};
		},
		link: function(s, element) {

		}
	}
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