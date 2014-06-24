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