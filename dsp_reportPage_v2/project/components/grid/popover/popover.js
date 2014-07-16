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