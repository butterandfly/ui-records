/*
Z.controller('reportFilterIntro', {
	templatePath:	'components/reportFilterIntro/reportFilterIntro.tmpl',
	buildContext: function() {
		return {};
	},
	afterBuild: function(elm) {
		elm.on('click', function() {
			var filter = $('#report-filter');
//			filter.addClass('animated', 'fadeInRight');
			filter.addClass('animated fadeInRight');
			filter.removeClass('hide');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('hide');
				filter.removeClass('animated fadeInRight');
			});
		});
	}
});
*/

var app = angular.module('dspApp');

app.controller('ReportFilterIntroCtrler', function($scope, reportService) {
	reportService.registerFilterIntro($scope);

	$scope.openFilter = function() {
		reportService.filter.open();
	}
});

app.directive('reportFilterIntro', function() {
	return {
		restrict: 'E',
		controller: 'ReportFilterIntroCtrler',
		templateUrl: 'components/reportFilterIntro/reportFilterIntro.tmpl'
	}
});
