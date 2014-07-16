var dspApp = angular.module('dspApp');

dspApp.controller('GridController', function($scope, gridDataService, layoutService) {
	var s = $scope;

	// 数据
	$scope.rows = gridDataService.getGridData();
	// 标题
	$scope.title = '活动报表';
	// 表头
	$scope.reportIndexes = gridDataService.getGridIndexes();
	// 读取状态
	$scope.isLoading = false;

	s.preselectedRow = null;

	s.isPreselectedRow = function(row) {
		if (row === s.preselectedRow) return true;
		return false;
	}

	s.preselectRow = function(row) {
		s.preselectedRow = row;
	}
	s.unPreselectRow = function() {
		s.preselectedRow = null;
	}

	// 打开子表格
	s.openSubgrid = function(type, rowData) {
		layoutService.gridModal.openSubgrid(type, rowData);
	}
});

dspApp.directive('grid', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/grid/grid.tmpl',
		controller: 'GridController',
		scope: true,
		link: function(s, element) {
			var originTable = element.find('.origin-table');
			// copyTable用来存放那个fixed的表头
			var copyTableCont = element.find('.fixed-header-cont');
			var copyTable = element.find('.fixed-header');

			//
			var scrollableDiv = element.find('.grid-scrollable');

			scrollableDiv.on('scroll', function($event) {
				var scrollX = $(this).scrollLeft();
				copyTable.css({
					'left': '-'+ scrollX + 'px'
				})
				copyTable.find('.fixed-col-1').css({
					'left': scrollX + 'px'
				});
			})

			function resizeFixed() {
				$t_fixed.find("th").each(function(index) {
					$(this).css("width",$this.find("th").eq(index).outerWidth()+"px");
				});
			}

			function scrollFixed() {
				var windowScrollTop = $(this).scrollTop();
				var offset = $(this).scrollTop(),
					tableOffsetTop = originTable.offset().top,
					tableOffsetBottom = tableOffsetTop + originTable.height() - originTable.find("thead").height();
				if((offset + 50) < tableOffsetTop || offset > tableOffsetBottom) {
					copyTableCont.hide();
				}
				else if((offset + 50) >= tableOffsetTop && (offset + 50) <= tableOffsetBottom) {
					copyTableCont.css({
						'top': $(this).scrollTop() - tableOffsetTop + 50 + 'px'
					})

					copyTableCont.show();
				}
			}

			$(window).scroll(scrollFixed);

		}
	}
});
