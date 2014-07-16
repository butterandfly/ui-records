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
		for(i = 0; i < 15; i++) {
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