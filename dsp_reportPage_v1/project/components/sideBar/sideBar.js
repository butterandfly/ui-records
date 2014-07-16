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
