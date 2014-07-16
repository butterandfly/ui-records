angular.module('dspApp')
	.directive('modalGrid', function() {
		return {
			restrict: 'E',
			scope: {
				currentGrid: '='
			},
			controller: function($scope, layoutService) {

			},
			templateUrl: 'components/modalGrid/modalGrid.tmpl'
		}
	})
