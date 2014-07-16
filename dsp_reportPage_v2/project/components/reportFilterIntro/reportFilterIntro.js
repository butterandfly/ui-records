angular.module('dspApp')
	.controller('ReportFilterIntroCtrler', function($scope) {
	})
	.directive('reportFilterIntro', function() {
		return {
			restrict: 'E',
			controller: 'ReportFilterIntroCtrler',
			templateUrl: 'components/reportFilterIntro/reportFilterIntro.tmpl'
		}
	});
