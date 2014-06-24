Z.controller('reportFilter', {
	templatePath: 'components/reportFilter/reportFilter.tmpl',
	buildContext: function() {
		return {}
	},
	afterBuild: function(elm) {
		var filter = elm;

		// 确认过滤
		elm.find('.button-filter').on('click', function() {
			filter.addClass('fadeOutRight animated');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('fadeOutRight animated');
				filter.addClass('hide');
			});
		});
	}
});