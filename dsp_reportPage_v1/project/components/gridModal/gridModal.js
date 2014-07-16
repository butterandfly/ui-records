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
