Z.controller('selectPad', {
	templatePath: 'components/selectPad/selectPad.tmpl',
	buildContext: function() {
		return {
			selectList: [
				'朱古力新地',
				'麦辣鸡腿汉堡',
				'麦辣鸡翅',
				'薯条',
				'麦乐鸡'
			]
		}
	},
	afterBuild: function(elm) {
		var selectModal = elm.find('.select-modal');

		// 添加按钮
		elm.find('.add-new').on('click', function() {
			// 显示select-modal
			selectModal.toggleClass('hide');
		});

		// modal中的确认
		elm.find('.button-ok').on('click', function() {
			selectModal.addClass('hide');
		});

	}
});