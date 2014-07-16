angular.module('dspApp')
	.directive('manageCenter', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/manageCenter/manageCenter.tmpl',
			scope: true,
			link: function(s, element) {
			}
		}
	});