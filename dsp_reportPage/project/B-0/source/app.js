Z.controller('report', {
	templatePath: 'pages/report/report.tmpl',
	buildContext: function() {
		// 数据
		var reportPageContext = {
			title: '活动报表',
//			indexes: ['ID', '活动展示量', '点击量', '点击率', 'B_展示量', '点击到达率',
//				'注册量', 'B_注册率', 'CPM(元)', 'CPC(元)', 'CPA(元)', '总消费(元)', '竞得率', '出价'],
			indexes: [
				{name: 'ID', hasSearch: true},
				{name: '活动名', hasSearch: true},
				{name: '活动展示量', hasIndexFilter: true},
				{name: '点击量', hasIndexFilter: true},
				{name: '点击率'},
				{name: 'B_展示量'},
				{name: '点击到达率'},
				{name: '注册量'},
				{name: 'B_注册率'}
			],
			rows: []
		};

		var row = {
			id: 10007,
			name: '小苹果',
			showCount: 77,
			clickCount: 7,
			clickRate: '9%',
			BShowCount: 107,
			reachRate: '17%',
			registerRate: '7%',
			BRegisterRate: '7%'
		}

		var i;
		for(i = 0; i < 30; i++) {
			reportPageContext.rows.push(row);
		}

		return reportPageContext;
	},
	afterBuild: function(elm) {
		function toggleFilterRow() {
			elm.find('.filter-row').toggleClass('hide');
		}

		$('.show-search').on('click', function() {
			toggleFilterRow();
		});
		$('.show-index-filter').on('click', function() {
			toggleFilterRow();
		});
	}
});
Z.controller('reportFilter', {
	templatePath: 'components/reportFilter/reportFilter.tmpl',
	buildContext: function() {
		return {}
	},
	afterBuild: function(elm) {
		var filter = elm;

		// 确认过滤
		elm.find('.button-filter').on('click', function() {
			filter.addClass('fadeOutUp animated');

			filter.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				filter.removeClass('fadeOutUp animated');
				filter.addClass('hide');
			});
		});
	}
});
Z.controller('reportFilterIntro', {
	templatePath:	'components/reportFilterIntro/reportFilterIntro.tmpl',
	buildContext: function() {
		return {};
	},
	afterBuild: function(elm) {
		elm.on('click', function() {
			var filter = $('#report-filter');
			Z.doAnimate(filter, 'fadeInDown', function(){});

			// 出现透屏
//			var backdrop = $('#backdrop').removeClass('hide');
//			Z.doAnimate(backdrop, 'fadeIn-50', function(){});

		});
	}
});
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
	}
});