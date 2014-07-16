var app = angular.module('dspApp');

app.controller('LeftSideBarController', function($scope, reportService, layoutService) {
	$scope.isSlim = true;

	$scope.navList = [
		{text: '概述', link: ''},
		{text: 'South Park', subList: [
			{text: 'Kenny', link: '#'},
			{text: 'Eric', link: '#'},
			{text: 'Stan', link: '#'},
			{text: 'Kyle', link: '#'}
		]},
		{text: 'The Avengers', subList: [
			{text: 'Spider Man', link: '#'},
			{text: 'Iron Man', link: '#'},
			{text: 'Captain America', link: '#'},
			{text: 'Black Widow', link: '#'},
			{text: 'Thor', link: '#'}
		]}
	];

	$scope.toggleSlim = function() {
		if (layoutService.isLeftCrushing) {
			return;
		}
		$scope.isSlim = !$scope.isSlim;
	}

	$scope.toggleLeftCrushing = function() {
		layoutService.isLeftCrushing = !layoutService.isLeftCrushing;
	}
})

app.directive('leftSideBar', function() {
	return {
		restrict: 'E',
		controller: 'LeftSideBarController',
		templateUrl: 'components/leftSideBar/leftSideBar.tmpl',
		scope: true,
		replace: true
	};
});

app.directive('linkGroup', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/leftSideBar/linkGroup.tmpl',
		scope: true,
		replace: true,
		link: function(scope, element, attrs) {
			var data = scope.$eval(attrs.rgData);

			scope.title = data.title;
			scope.listCtrler = createRadiableListCtrler(data.list, data.selected);

			scope.isSubOpened = false;
			scope.toggleSub = function() {
				scope.isSubOpened = !scope.isSubOpened;
			}
		}
	};
});

app.directive('navSearch', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/leftSideBar/navSearch.tmpl',
		scope: true,
		replace: true,
		link: function(scope, element, attrs) {
			var data = scope.$eval(attrs.rgData);

			scope.list = data.list;
			scope.isSearching =false;
			scope.keyword = '';

			/*
			element.find('input').bind('keypress', function(ev){
				if(scope.keyword != '') {
					scope.isSearching = true;
				} else {
					scope.isSearching = false;
				}
			})
			*/
		}
	};
});