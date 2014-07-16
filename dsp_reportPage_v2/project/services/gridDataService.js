// 该服务用于提供grid的数据
angular.module('dspApp').service('gridDataService', function() {
	var gridIndexes = [
		{key: 'id', name: 'ID', hasSearch: true},
		{key: 'name', name: '活动名', hasSearch: true},
		{key: 'showCount', name: '活动展示量', hasIndexFilter: true},
		{key: 'clickCount', name: '点击量', hasIndexFilter: true},
		{key: 'clickRate', name: '点击率'},
		{key: 'BShowCount', name: 'B_展示量'},
		{key: 'reachRate', name: '点击到达率'},
		{key: 'registerRate', name: '注册量'},
		{key: 'BRegisterRate', name: 'B_注册率'}
	];

	// ------- 伪数据 -------
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
	};

	var rows = [];
	var i;
	for(i = 0; i < 40; i++) {
		rows.push(angular.copy(row));
	}

	this.getGridIndexes = function() {
		return gridIndexes;
	}

	this.getGridData = function() {
		return rows;
	};
})