Z.controller('selectPadV2', {
	templatePath: 'components/selectPadV2/selectPadV2.tmpl',
	buildContext: function() {
		return {
			selectList: [
				'朱古力新地',
				'麦辣鸡腿汉堡',
				'麦辣鸡翅',
				'薯条',
				'麦乐鸡',
				'草莓新地',
				'小咖啡',
				'冰旋咖啡',
				'热朱古力',
				'圆筒',
				'朱古力新地',
				'麦辣鸡腿汉堡',
				'麦辣鸡翅',
				'薯条',
				'麦乐鸡',
				'草莓新地',
				'小咖啡',
				'冰旋咖啡',
				'热朱古力',
				'圆筒',
				'朱古力新地',
				'麦辣鸡腿汉堡',
				'麦辣鸡翅',
				'薯条',
				'麦乐鸡',
				'草莓新地',
				'小咖啡',
				'冰旋咖啡',
				'热朱古力',
				'圆筒'
			]
		}
	},
	afterBuild: function(elm) {
		// 更多
		elm.find('li').on('click', function() {
			$(this).toggleClass('bg-primary');
		})
	}
});