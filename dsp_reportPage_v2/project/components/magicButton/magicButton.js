angular.module('dspApp')
	.directive('magicButton', function(layoutService, $document) {
		return {
			restrict: 'E',
			templateUrl: './components/magicButton/magicButton.tmpl',
			link: function(scope, element) {
				// 下面拖拽的代码严重参考了：http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
				// TODO: 尝试不要绑定document，参考：http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
				// TODO: 另外可以看看jquery-ui的解决方案

				function ExtractNumber(value) {
					var n = parseInt(value);
					return n == null || isNaN(n) ? 0 : n;
				}

				function $(id) {
					return document.getElementById(id);
				}

				var _startX = 0;            // mouse starting positions
				var _startY = 0;
				var _offsetX = 0;           // current element offset
				var _offsetY = 0;
				var _dragElement;
				var mouseDownTime;

				function OnMouseDown(e) {
					var target = e.target;

					if (target.className == 'main-btn') {
						// 记录当前时间
						mouseDownTime = e.timeStamp;

						// grab the mouse position
						_startX = e.clientX;
						_startY = e.clientY;

						// grab the clicked element's position
						_offsetX = ExtractNumber(target.style.left);
						_offsetY = ExtractNumber(target.style.top);

						// we need to access the element in OnMouseMove
						_dragElement = target;

						// tell our code to start moving the element with the mouse
						document.onmousemove = OnMouseMove;

						// cancel out any text selections
						document.body.focus();

						// prevent text selection (except IE)
						return false;
					}
				}

				function OnMouseUp(e) {
					if (_dragElement != null) {
						document.onmousemove = null;
						document.onselectstart = null;
						_dragElement.ondragstart = null;

						// this is how we know we're not dragging
						_dragElement = null;

						var mouseUpTime = e.timeStamp;
						if ((mouseUpTime - mouseDownTime) < 200 ) {
							scope.$apply(function() {
								scope.openGridModal();
							});
						}
					}
				}

				function OnMouseMove(e) {
					_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
					_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
				}

				document.onmousedown = OnMouseDown;
				document.onmouseup = OnMouseUp;

				/////////////////////////////////////////

				// 打开gridModal
				scope.openGridModal = function() {
					layoutService.gridModal.isActive = !layoutService.gridModal.isActive;
				}
			}
		}
	})
