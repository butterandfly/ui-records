angular.module('dspApp').directive('gridNav', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/gridModal/gridNav/gridNav.tmpl',
		scope: true,
		transclude: true,
		controller: function($scope, gridModalSystem) {
			$scope.navList = [];
			gridModalSystem.navListCtrler = $scope.listCtrler = {};
		},
		link: function(s, element) {

		}
	}
});