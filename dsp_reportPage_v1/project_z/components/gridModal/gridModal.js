var app = angular.module('dspApp');

app.controller('GridModalController', function($scope) {
	var s = $scope;

	s.isActive = false;

	s.toggleActive = function() {
		s.isActive = !s.isActive;
	};
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