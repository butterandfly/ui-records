/*
Z.controller('selectPad', {
	templatePath: 'components/selectPad/selectPad.tmpl',
	buildContext: function() {
		return {
			selectList: [
				'朱古力新地',
				'麦辣鸡腿汉堡',
				'麦辣鸡翅',
				'薯条',
				'麦乐鸡'
			]
		}
	},
	afterBuild: function(elm) {
		var selectModal = elm.find('.select-modal');

		// 添加按钮
		elm.find('.add-new').on('click', function() {
			// 显示select-modal
			selectModal.toggleClass('hide');
		});

		// modal中的确认
		elm.find('.button-ok').on('click', function() {
			selectModal.addClass('hide');
		});

	}
});
	*/

var app = angular.module('dspApp');

app.controller('SelectPadController', function($scope) {
	console.log('controller计数');
	$scope.selectList = [
		'朱古力新地',
		'麦辣鸡腿汉堡',
		'麦辣鸡翅',
		'薯条',
		'麦乐鸡'
	];
	$scope.isSelectListOpened = false;

	// 显示选择modal
	$scope.openSelectList = function() {
		console.log('open计数');
		$scope.isSelectListOpened = true;
	}

	// 隐藏
	$scope.closeSelectList = function() {
		$scope.isSelectListOpened = false;
	}
});

app.directive('selectPad', function() {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'components/selectPad/selectPad.tmpl',
		controller: 'SelectPadController'
	};
});