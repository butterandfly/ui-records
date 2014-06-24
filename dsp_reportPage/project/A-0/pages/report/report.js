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