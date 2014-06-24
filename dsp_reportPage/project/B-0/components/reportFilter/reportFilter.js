Z.controller('reportFilter', {
	templatePath: 'components/reportFilter/reportFilter.tmpl',
	buildContext: function() {
		return {}
	},
	afterBuild: function(elm) {
		var filter = elm;
		var backdrop = $('#backdrop');

		// 确认过滤
		elm.find('.button-filter').on('click', function() {
			backdrop.addClass('hide');
			filter.addClass('hide');
			/*
			filter.addClass('fadeOutUp animated');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('fadeOutUp animated');
				filter.addClass('hide');
			});
			*/

			$('.loading-msg').removeClass('hide');
			setTimeout(function() {
				$('.loading-msg').addClass('hide');
			}, 2000)
		});

		backdrop.on('click', function() {
			backdrop.addClass('hide');
			filter.addClass('hide');

		})
	}
});