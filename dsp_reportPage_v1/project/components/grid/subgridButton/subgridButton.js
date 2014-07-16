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