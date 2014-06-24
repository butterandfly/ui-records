Z.controller('reportFilterIntro', {
	templatePath:	'components/reportFilterIntro/reportFilterIntro.tmpl',
	buildContext: function() {
		return {};
	},
	afterBuild: function(elm) {
		elm.on('click', function() {
			var backdrop = $('#backdrop').removeClass('hide');
			var filter = $('#report-filter').removeClass('hide');

//			var filter = $('#report-filter');
//			Z.doAnimate(filter, 'fadeInDown', function(){});

			// 出现透屏
//			var backdrop = $('#backdrop').removeClass('hide');
//			Z.doAnimate(backdrop, 'fadeIn-50', function(){});

		});
	}
});