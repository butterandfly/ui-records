angular.module('dspApp').service('gridModalSystem', function() {
	this.navListCtrler = null;

	this.gridModal = null;

	this.openSubgrid = function(type, rowData) {
		// 添加一个表格
		var subgrid = {
			'title': type
		};
		this.navListCtrler.list.push(subgrid);
		this.navListCtrler.selectItem(subgrid);

		// 打开gridModal
		this.gridModal.isActive = true;
	};

	/*
	 s.addSubgrid = function() {
	 // TODO: 添加一个表格
	 // gridModal做响应
	 s.isTipping = true;
	 $timeout(function() {
	 s.$apply(function() {
	 s.isTipping = false;
	 });
	 }, 550);
	 }
	 */
})