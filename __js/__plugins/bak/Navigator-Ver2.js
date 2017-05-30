+function (){

	// 监听全局click事件 回调函数中分析具体响应行为
	$(document).on('click.sdm-dropdown', analysis);

	function analysis(e){
		e.preventDefault();
		e.stopPropagation();
		let $elem = $(e.target);
		$elem.hasClass('sdm-dropdown-toggle') || $elem.hasClass('sdm-caret') || $elem.hasClass("caret-fixed") 
		? toggleMenu($elem) : closeMenu();
	}

	function toggleMenu(elem){
		let $elem = elem;
		$elem.hasClass("caret-fixed") ? $elem = $elem.parent() : $elem.hasClass("sdm-caret") ? $elem = $elem.parent().parent() : '';

		let $parent = $elem.parent();

		if ($parent.hasClass('sdm-dropdown-option')){
			closeMenu();
			return;
		}

		// 处理下拉子菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-submenu-title') && !$parent.hasClass('sdm-dropdown-root')){
			let $ul = $($parent.find('ul')[0]);
			// 判断 子菜单是否已经打开
		 	let isOpen = $ul.hasClass('open');

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

				isOpen || $ul.addClass('open');
			}		 	
			return;
		}

		// 处理根菜单的伸缩
		if ($parent.hasClass('sdm-dropdown-root')){
			let $ul = $($parent.find('ul')[0]);
			let isOpen = $ul.hasClass('open');
			closeMenu();
			isOpen || $ul.addClass('open');
			return;
		}
	}	

	function closeMenu(){
		$('.sdm-dropdown-root ul').each(function(){
			$(this).removeClass('open');
		});
	}
}();




