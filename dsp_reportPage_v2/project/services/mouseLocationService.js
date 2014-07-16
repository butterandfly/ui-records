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