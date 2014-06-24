Z.controller('report', {
	templatePath: 'pages/report/report.tmpl',
	buildContext: function() {
		// 数据
		var reportPageContext = {
			title: '活动报表',
			indexes: ['状态', 'ID', '活动展示量', '点击量', '点击率', 'B_展示量', '点击到达率',
				'注册量', 'B_注册率', 'CPM(元)', 'CPC(元)', 'CPA(元)', '总消费(元)', '竞得率', '出价'],
			rows: []
		};

		var i;
		for(i = 0; i < 10; i++) {
			var row = [];
			var j;
			for(j = 0; j < 15; j++) {
				row.push(777);
			}
			reportPageContext.rows.push(row);
		}

		return reportPageContext;
	},
	afterBuild: function() {

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