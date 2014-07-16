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