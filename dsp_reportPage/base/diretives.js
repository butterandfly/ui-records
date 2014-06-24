var rgDirectives = angular.module('rgDirectives', []);

// ng已自带，可以删
rgDirectives.directive('rg-hide', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(attrs.rgHide, function(newVal, oldVal) {
				if (newVal) {
//					$animate.addClass(element, "hide");
					element.addClass('hide');
				} else {
					element.removeClass('hide');
//					$animate.removeClass(element, "hide");
				}
			})
		}
	};
});

rgDirectives.directive('rgLoading', function() {
	return {
//		replace: true,
		restrict: 'E',
		templateUrl: '/base/directives/loading/loading.tmpl',
		link: function(scope, element, attrs) {
			scope.$watch(attrs.loading, function(newVal, oldVal) {
				if (newVal) {
					element.removeClass('hide');


				} else {
					element.addClass('hide');
				}
			});
		}
	}
});

rgDirectives.directive('rgBtnGroupRadio', function() {
	return {
		restrict: 'E',
		templateUrl: '/base/directives/btnGroupRadio/btnGroupRadio.tmpl',
		link: function(scope, element, attrs) {
			// TODO: 不确定selectedItem是否必须
			scope.selectedItem = null;
			scope.btnList = scope.$eval(attrs.btnList);

			scope.changeSelect = function(item) {
				angular.forEach(scope.btnList, function(btnItem) {
					btnItem.isSelected = false;
				});
				item.isSelected = true;

				scope.selectedItem = item;
			}
		},
		scope: true
	}
});
