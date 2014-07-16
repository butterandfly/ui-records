var app = angular.module('dspApp');

app.controller('GridModalController', function($scope, layoutService, gridModalLayoutService, gridModalSystem) {
	var s = $scope;

	layoutService.gridModal = s;
	gridModalSystem.gridModal = s;

	s.modalLayout = gridModalLayoutService;
	s.isActive = false;
	s.isTipping = false;

	s.toggleActive = function() {
		s.isActive = !s.isActive;
	};
	// TODO: 该controller销毁时将layoutService的gridModal设置为null；或许应该在layoutService中执行
})

app.directive('gridModal', function() {
	return {
		restrict: 'E',
		controller: 'GridModalController',
		templateUrl: 'components/gridModal/gridModal.tmpl',
		scope: true,
		transclude: true,
		link: function(scope, element, attrs) {
		}
	};
});

dspApp.service('gridModalLayoutService', function($rootScope) {
	this.leftBar = null;
	this.rightBar = null;

	var self = this;
	$rootScope.gridModalLayoutService = this;
});
