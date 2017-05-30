'use strict';

+function () {

	// 监听全局click事件 回调函数中分析具体响应行为
	$(document).on('click.sdm-dropdown', analysis);

	function analysis(e) {
		e.preventDefault();
		e.stopPropagation();
		var $elem = $(e.target);
		$elem.hasClass('sdm-dropdown-toggle') || $elem.hasClass('sdm-caret') || $elem.hasClass("caret-fixed") ? toggleMenu($elem) : clearMenu();
	}

	function toggleMenu(elem) {
		var $elem = elem;
		$elem.hasClass("caret-fixed") ? $elem = $elem.parent() : $elem.hasClass("sdm-caret") ? $elem = $elem.parent().parent() : '';

		var $parent = $elem.parent();

		if ($parent.hasClass('sdm-dropdown-option')) {
			clearMenu();
			return;
		}

		// 处理下拉子菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-submenu-title') && !$parent.hasClass('sdm-dropdown-root')) {
			var submenuHideCallback = function submenuHideCallback() {
				// 关闭已经打开的菜单
				closeMenu();
				// 重新制定已打开的菜单路径
				var id = $elem.attr("href");
				var $openUls = $(id).find('ul');
				if ($openUls.length) {
					var parenUl = $ul.parent().parent()[0];
					$openUls.each(function () {
						$(this).addClass('open');
						if (this == parenUl) return false; // return false == break;
					});

					isOpen || showMenu($ul);
				}
			};

			var $ul = $($parent.find('ul')[0]);
			// 判断 子菜单是否已经打开
			var isOpen = $ul.hasClass('open');

			hideMenu($elem, submenuHideCallback);

			return;
		}

		// 处理根菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-root')) {
			var rootMenuHideCallback = function rootMenuHideCallback() {
				closeMenu();
				_isOpen || showMenu(_$ul);
			};

			var _$ul = $($parent.find('ul')[0]);
			var _isOpen = _$ul.hasClass('open');
			// step1 执行收缩动画 step2 清空所有open
			hideMenu($elem, rootMenuHideCallback);

			return;
		}
	}

	/*
 	将所有展开菜单收缩
 */
	function hideMenu(elem, resolve) {
		var ul = elem.parent().parent()[0];
		var $collapsed = $($('.sdm-dropdown-root ul.sdm-collapse'));
		if (!$collapsed.length || ul == $collapsed[0]) {
			resolve();
			return;
		}
		var height = $collapsed.height();
		$collapsed.height(height);
		$collapsed.addClass('sdm-collapsing')['height'](0);

		if (!$.support.transition) {
			$collapsed.removeClass('sdm-collapsing')['height']('');
			resolve();
		} else {
			$collapsed.one('bsTransitionEnd', function () {
				$collapsed.removeClass('sdm-collapsing')['height']('');
				resolve();
			});
		}
	}

	function showMenu(elem) {
		var $elem = elem;
		var height = $elem.addClass('open').height();
		$elem.addClass('sdm-collapsing')['height'](0);
		$elem.height(height);
		if (!$.support.transition) {
			$elem.removeClass('sdm-collapsing')['height']('');
			$elem.addClass('sdm-collapse');
		} else {
			$elem.one("bsTransitionEnd", function () {
				$elem.removeClass('sdm-collapsing')['height']('');
				$elem.addClass('sdm-collapse');
			});
		}
	}

	function clearMenu() {
		closeMenu();
		$('[data-toggle="collapse"]').hasClass('collapsed') || $('[data-toggle="collapse"]').trigger('click.bs.collapse.data-api'); // 触发collapse关闭
	}

	function closeMenu() {
		$('.sdm-dropdown-root ul.open').each(function () {
			$(this).removeClass('open').removeClass('sdm-collapse');
		});
	}
}();
