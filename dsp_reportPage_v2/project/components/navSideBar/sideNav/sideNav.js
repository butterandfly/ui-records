angular.module('dspApp')
	.directive('sideNav', function() {
		return {
			templateUrl: 'components/navSideBar/sideNav/sideNav.tmpl',
			scope: 'true',
			restrict: 'E',
			controller: 'SideNavController',
			link: function(scope, element) {
			}
		};
	})

	.controller('SideNavController', function($scope) {
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
	})

//	.directive('navSearch', function() {
//		return {
//			restrict: 'E',
//			templateUrl: 'components/leftSideBar/navSearch.tmpl',
//			scope: true,
//			replace: true,
//			link: function(scope, element, attrs) {
//				var data = scope.$eval(attrs.rgData);
//
//				scope.list = data.list;
//				scope.isSearching =false;
//				scope.keyword = '';
//
//				/*
//				 element.find('input').bind('keypress', function(ev){
//				 if(scope.keyword != '') {
//				 scope.isSearching = true;
//				 } else {
//				 scope.isSearching = false;
//				 }
//				 })
//				 */
//			}
//		};
//	});
