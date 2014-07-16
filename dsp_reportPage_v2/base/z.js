// 临时的帮助性框架
// 依赖jquery，handlebars
window.Z = {};

(function(Z) {
	// 将字符串的第一个字母大写
	function upperFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// 将字符串的第一个字母小写
	function lowerFirstLetter(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	}

	// 该方法将横杆命名转为驼峰命名
	function hyphen2Camel(str) {
		var strs = str.split('-');

		var result = '';
		var i, len;
		for(i = 0, len = strs.length; i < len; i++) {
			result += upperFirstLetter(strs[i]);
		}
		result = lowerFirstLetter(result);

		return result;
	}

	// 检查一个变量是否为undefined
	function isUndefined(val) {
		if (typeof val == 'undefined') {
			return true;
		}
		return false;
	}

	// 错误输出
	function logErr(str) {
		console.log('Error in Z: ' + str);
	}
	Z.logErr = logErr;

	// 存放模块
	Z.ctrls = {};

	// 方法从一个html文件中生成模板
	// @param {string} path html文件路径
	// @param {object} context 替代模板中的表达式的内容
	// @param {function(html)} callback 回调函数，html为生成的html内容
	function buildHtmlByAjaxTmpl(path, context, callback) {
		var source;
		var template;
		var html;

		$.ajax({
			url: path,
			cache: true,
			success: function(data) {
				source    = data;
				template  = Handlebars.compile(source);
				html = template(context);
				callback(html);
			}
		});
	}
	Z.buildHtmlByAjaxTmpl = buildHtmlByAjaxTmpl;

	/*
	function component(name, initFunc) {
		// @1 返回component
		if (typeof initFunc === 'undefined') {
			return Z.comps[name];
		}

		// @2 注册component
	}
	*/

	// 该方法可以得到一个controller，或注册一个controller
	function controller(name, controller) {
		// @1 返回controller
		if (isUndefined(controller)) {
			return Z.ctrls[name];
		}

		// @2 注册controller
		Z.ctrls[name] = controller;
	}
	Z.controller = controller;

	function buildByZController(jqElm) {
		var controllerStr = hyphen2Camel(jqElm.attr('controller'));

		// 取得controller
		var controller = Z.ctrls[controllerStr];
		if (isUndefined(controller)) {
			logErr('不存在controller(' + controllerStr + ')');
			return;
		}

		// 创建html
		var context = controller.buildContext();
		buildHtmlByAjaxTmpl(controller.templatePath, context, function(html) {
			// 插入生成了的dom
			var createdElm = $(html);
			createdElm.insertAfter(jqElm);

			// 执行controller的afterBuild
			controller.afterBuild(createdElm);

			// 删除标记elm
			jqElm.remove();

			// 对创建了的dom在编译一遍(init)
			init(createdElm);
		});
	}

	function init(parent) {
		parent.filter('z-controller').each(function() {
			var elm = $(this);
			buildByZController(elm);
		})

		parent.find('z-controller').each(function() {
			var elm = $(this);
			buildByZController(elm);
		})
	}

	Z.boot = function() {
		init($(document));
	}

})(Z);

// 帮组性质的方法
(function(Z) {
	function doAnimate(jqElm, animateName, callback) {
		jqElm.addClass('animated ' + animateName);
		jqElm.removeClass('hide');

		jqElm.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			jqElm.removeClass('animated fadeInDown');
			callback();
		});
	}
	Z.doAnimate = doAnimate;
})(Z);


