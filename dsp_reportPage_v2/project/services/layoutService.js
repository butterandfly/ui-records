// 布局系统
angular.module('dspApp').service('layoutService', function($rootScope) {
	this.leftBar = null;
	this.rightBar = null;
	this.gridModal = null;

	this.isManaging = false;

	var self = this;
	$rootScope.layoutService = this;

	this.toggleManaging = function() {
		this.isManaging = !this.isManaging;
	};

	this.getOtherPageName = function() {
		return this.isManaging ? '报表页' : '后台管理';
	};
})