var app = angular.module('dspApp');

app.directive('topNav', function() {
	return {
		scope: true,
		templateUrl: 'components/topNav/topNav.tmpl',
		restrict: 'E'
	}
});