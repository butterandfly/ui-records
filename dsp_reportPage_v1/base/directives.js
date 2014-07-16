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

var createRadiableListCtrler = function(list, selected) {
	var ls = list || [];
	var sel = selected || null;

	return {
		// 选中项
		selectedItem: sel,
		// 列表
		list: list,
		// 选中其中一项
		selectItem: function(item) {
			this.selectedItem = item;
		},
		// 判断项是否为选中项
		isSelected: function (item) {
			if (item === this.selectedItem) {
				return true;
			}
			return false;
		}
	}
}

var createCheckboxableListCtrler = function() {
	return {
		// 选中项
		selectedItems: [],
		// 列表
		list: [],
		// 选中其中一项
		selectItem: function(item) {
			// 从selectedItems删除或增加
			if (rg.isInArray(this.selectedItems, item)) {
				// 删除
				rg.deleteFromArray(this.selectedItems, item);
			} else {
				// 添加
				this.selectedItems.push(item);
			}
		},
		// 判断项是否为选中项
		isSelected: function (item) {
			return rg.isInArray(this.selectedItems, item);
		}
	}
}

rgDirectives.directive('rgBtnGroupRadio', function() {
	return {
		restrict: 'E',
		templateUrl: '/base/directives/btnGroupRadio/btnGroupRadio.tmpl',
		link: function(scope, element, attrs) {
			// 使用单选数组
			var listCtrler = scope.listCtrler = createRadiableListCtrler();

			listCtrler.list = scope.$eval(attrs.list);
		},
		scope: true
	}
});

rgDirectives.directive('rgList', function() {
	return {
		restrict: 'E',
		templateUrl: '/base/directives/list/list.tmpl',
		link: function(scope, element, attrs) {
			//  使用多选数组
			var listCtrler = scope.listCtrler = createCheckboxableListCtrler();
			listCtrler.list = scope.$eval(attrs.rgListModel);

			var selectedItems = scope.$eval(attrs.rgListSelected);
			if (selectedItems) {
				listCtrler.selectedItems = scope.$eval(attrs.rgListSelected);
			}
		},
		scope: true
	}
});

/*
rgDirectives.directive('rg-list-comb', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// 要组合的controller
			var targetController  = null;
			var listCtrler = null;

			//
			scope.init = function(ctrl, list, selected) {
				targetController = ctrl
				listCtrler = createRadiableListCtrler(list, selected);

				ctrl.listCtrler = listCtrler;
			}

			// 执行init
			scope.$eval(attrs.rgListComb);
		}
	}
});
*/

// 该指令用于在模板中使用多个transclude
// 需要在$transclude的内容中使用"rg-multi-transclude-name"
// TODO: 替代原来的
rgDirectives.directive('rgMultiTransclude', function() {
	return {
		strict: 'A',
		link: function($scope, $element, $attrs, controller, $transclude) {
			if (!$transclude) {
				throw minErr('rgMultiTransclude')('orphan',
					'Illegal use of rgMultiTransclude directive in the template! ' +
						'No parent directive that requires a transclusion found. ' +
						'Element: {0}',
					startingTag($element));
			}

			var name = $attrs.rgMultiTransclude;

			$transclude(function(clone) {
				var jqElm = clone.filter('[rg-multi-transclude-name=' + name + ']');

				$element.empty();
				$element.append(jqElm);
			});
		}
	}
});

// TODO: 这是一个临时解决方案；更好的方法是在longClick中能终止click方法的响应；但未能解决
// @usage: rg-long-click="{'longClick': addSubgrid, 'shortClick': openSubgrid, 'interval': 600}"
rgDirectives.directive('rgLongClick', function($parse, $timeout) {
	return {
		strict: 'A',
		link: function(scope, element, attrs) {
			var data = scope.$eval(attrs.rgLongClick);
			var longClick = data.longClick;
			var shortClick = data.shortClick;
			var interval = data.interval;

			var timer;
			element.bind('mousedown', function(ev) {
				timer = $timeout(function() {
					scope.$apply(function() {
						scope.$eval(longClick);
					});

					// 销毁timer
					$timeout.cancel(timer);
					timer = null;
				}, interval);
			});
			element.bind('mouseup', function(ev) {
				if (timer) {
					// 短按的情况
					$timeout.cancel(timer);
					timer = null;

//					scope.$apply(function() {
//						scope.$eval(shortClick);
//					});

					var fn = $parse(shortClick);
					scope.$apply(function() {
						fn(scope, {$event:ev});
					});
				}
			});
		}
	}
});

// 依赖animate.css
rgDirectives.directive('animateOn', function($animate) {
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

// 依赖animate.css
rgDirectives.directive('animateShow', function($animate) {
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