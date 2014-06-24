var app = angular.module('dspApp');

app.service('reportService', function() {
	this.page = null;
	this.filterIntro = null;
	this.filter = null;

	// 注册report页
	this.registerPage = function(reportPage) {
		this.page = reportPage;
	}

	// 注册filter intro
	this.registerFilterIntro = function(intro) {
		this.filterIntro = intro;
	}

	// 注册过滤器
	this.registerFilter = function(filter) {
		this.filter = filter;
	}

	// report页读取数据
});