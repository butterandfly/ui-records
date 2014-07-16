angular.module('dspApp')
	.directive('subgridButtonGroup', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/grid/subgridButtonGroup/subgridButtonGroup.tmpl',
			scope: {
				'showBtns': '@',
				'rowData': '@',
				'gridInfo': '@'
			},
			transclude: true,
			link: function(scope, element, attrs) {
			}
		};
	});