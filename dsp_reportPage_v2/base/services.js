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
	})

	// 布局系统
	.service('layoutService', function($rootScope) {
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
	// 该服务用于提供grid的数据
	.service('gridDataService', function() {
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
	.service('gridModalSystem', function() {
		this.navListCtrler = null;

		this.gridModal = null;

		this.openSubgrid = function(type, rowData) {
			// 添加一个表格
			var subgrid = {
				'title': type
			};
			navListCtrler.list.push(subgrid);
			navListCtrler.selectItem(subgrid);

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
