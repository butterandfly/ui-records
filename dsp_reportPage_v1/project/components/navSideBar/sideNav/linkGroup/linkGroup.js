angular.module('dspApp').directive('linkGroup', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/navSideBar/sideNav/linkGroup/linkGroup.tmpl',
		scope: true,
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