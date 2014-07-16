angular.module('dspApp').directive('fullYButton', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/sideBar/fullYButton/fullYButton.tmpl',
		transclude: true,
		link: function(scope, element, attrs) {
		}
	};
});