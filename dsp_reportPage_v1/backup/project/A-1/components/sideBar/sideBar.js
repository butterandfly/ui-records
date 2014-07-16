var app = angular.module('dspApp');

app.controller('SideBarController', function($scope, $injector, $interval) {


	var s = $scope;
	s.init = function(side, serviceName) {
		s.side = side;
		s.status = 'slim';

		// 向service注册
//		var serviceName = 'layoutService';
		service = $injector.get(serviceName);
		service[side + 'Bar'] = s;
	}
	
	s.triggerCrush = function() {
		s.status = 'crush';

		/*
		var otherSide;
		s.side === 'left' ? otherSide = 'right': otherSide = 'left';
		var otherSideBar = layoutService[otherSide + 'Bar'];

		if(otherSideBar.status === 'crush') {
			otherSideBar.status = 'slim';
		}
		*/
	}

	s.cancelCrush = function() {
		s.status = 'float';
	}

	s.toggleCrush = function() {
		if (s.status === 'crush') {
			s.cancelCrush();
		} else {
			s.triggerCrush();
		}
	}

	// 鼠标离开与进入slim的事件
	var timer;
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

			scope.init(side, service);
		}
	};
});
