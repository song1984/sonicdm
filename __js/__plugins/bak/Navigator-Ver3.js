+function (){

	// 监听全局click事件 回调函数中分析具体响应行为
	$(document).on('click.sdm-dropdown', analysis);

	function analysis(e){
		e.preventDefault();
		e.stopPropagation();
		let $elem = $(e.target);
		$elem.hasClass('sdm-dropdown-toggle') || $elem.hasClass('sdm-caret') || $elem.hasClass("caret-fixed") 
		? toggleMenu($elem) : clearMenu();
	}

	function toggleMenu(elem){
		let $elem = elem;
		$elem.hasClass("caret-fixed") ? $elem = $elem.parent() : $elem.hasClass("sdm-caret") ? $elem = $elem.parent().parent() : '';

		let $parent = $elem.parent();
		// 如果用户点击的不是菜单的范围 比如任意空白区 则关闭菜单
		if ($parent.hasClass('sdm-dropdown-option')){
			clearMenu();
			return;
		}

		// 处理下拉子菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-submenu-title') && !$parent.hasClass('sdm-dropdown-root')){

			let $ul = $($parent.find('ul')[0]);
			// 判断 子菜单是否已经打开
		 	let isOpen = $ul.hasClass('open');
		 	
		 	let isToggle = $elem.parent().find('.sdm-collapse').length > 0;

		 	hideMenu($elem, submenuHideCallback);
		 	function submenuHideCallback(){
			 	// 关闭已经打开的菜单
			 	closeMenu();
			 	
			 	// 重新制定已打开的菜单路径
			 	let id = $elem.attr("href");
			 	let $openUls = $(id).find('ul');
				if($openUls.length){
					let parenUl = $ul.parent().parent()[0];
					$openUls.each(function(){
						$(this).addClass('open');
						if(this == parenUl) return false; // return false == break;
					});
				}

				if(isToggle){
					$elem.parent().parent().addClass('sdm-collapse');
				}
				isOpen || showMenu($ul);	
		 	}	
			return;
		}

		// 处理根菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-root')){
			let $ul = $($parent.find('ul')[0]);
			let isOpen = $ul.hasClass('open');
			// step1 执行收缩动画 step2 清空所有open
			hideMenu($elem, rootMenuHideCallback);

			function rootMenuHideCallback(){
				closeMenu();
				isOpen || showMenu($ul);
			}

			return;
		}
	}

	/*
		将所有展开菜单收缩
	*/
	function hideMenu (elem, resolve){

		let ul = elem.parent().parent()[0];
		// sdm-collapse 代表要进行关闭动画的菜单
		let $collapsed = $($('.sdm-dropdown-root ul.sdm-collapse')); 
		// 被点击的菜单是已经打开菜单的子菜单 
		if (!$collapsed.length || ul == $collapsed[0]) {
			resolve();
			return;
		}

		let height = $collapsed.height();
		$collapsed.height(height);
		$collapsed.addClass('sdm-collapsing')['height'](0);

		if(!$.support.transition){
			$collapsed.removeClass('sdm-collapsing')['height']('');
			resolve();
		}else{
			$collapsed.one('bsTransitionEnd', function(){
				$collapsed.removeClass('sdm-collapsing')['height']('');
				resolve();
			})
		}
	}

	function showMenu (elem){
		let $elem = elem;
		let height = $elem.addClass('open').height();
		$elem.addClass('sdm-collapsing')['height'](0);
		$elem.height(height);
		if(!$.support.transition){
			$elem.removeClass('sdm-collapsing')['height']('');
			$elem.addClass('sdm-collapse');
		}else{
			$elem.one("bsTransitionEnd", function(){			
				$elem.removeClass('sdm-collapsing')['height']('');
				$elem.addClass('sdm-collapse');
			})
		}		
	}

	function clearMenu(){
		closeMenu();
		$('[data-toggle="collapse"]').hasClass('collapsed') || $('[data-toggle="collapse"]').trigger('click.bs.collapse.data-api');	// 触发collapse关闭
	}

	function closeMenu(){
		$('.sdm-dropdown-root ul.open').each(function(){
			$(this).removeClass('open').removeClass('sdm-collapse');
		});
	}
}();




