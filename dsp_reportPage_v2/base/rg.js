var rg = window.rg = {};
(function(rg) {
	var isInArray = rg.isInArray = function(arr, obj) {
		if (arr.indexOf(obj) >-1) {
			return true;
		}
		return false;
	}

	var deleteFromArray = rg.deleteFromArray = function(arr, obj) {
		if ((index = arr.indexOf(obj)) >-1) {
			// 删除
			arr.splice(index, 1);
			return true;
		}
		return false;
	}
})(rg);