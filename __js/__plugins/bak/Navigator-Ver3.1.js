+function() {
	'use strict'
	// 监听点击事件，获得节点对象
	$(document).on('click.sdm-dropdown-menu', shunt);

	function shunt(event){
		event.preventDefault();
		event.stopPropagation();
		let $elem = $(event.target);
		$elem.hasClass('sdm-dropdown-toggle') || $elem.hasClass('sdm-caret') || $elem.hasClass("caret-fixed")
		? toggleMenu($elem) : closeAllMenu();
	}

	function toggleMenu(elem){
		elem.hasClass("caret-fixed") ? elem = elem.parent() : elem.hasClass("sdm-caret") ? elem = elem.parent().parent() : '';		
		if(elem.parent().hasClass('sdm-dropdown-option')){	// 如果是选项 直接关闭菜单
			closeAllMenu();
			return;
		}

		let ownMenu = elem.parent().find('ul')[0];	// 点击目标对应的菜单
		let parentMenu = elem.parent().parent()[0];	// 点击目标的父菜单
		let allOpenMenu = $.makeArray($('.sdm-dropdown-menu.open')); // 所有已经打开的菜单
		if(!allOpenMenu.length){	// 目前没有展开的菜单， 则不存在关闭和补全路径问题直接执行打开动画
			openMenu(ownMenu);
			return;
		}

		// 如果已存在打开的路径 判断 点击目标 与 当前展开路径的关系
		let ownInAllOpen = allOpenMenu.indexOf(ownMenu);
		let parentInAllOpen = allOpenMenu.indexOf(parentMenu);
		
		if(ownInAllOpen > -1){	// 证明这个当前打开 目标关闭
			closeMenu(ownMenu, complete(allOpenMenu, parentInAllOpen));
		}else if(parentInAllOpen > -1){	// 如果父菜单包含在其中且ownMenu不在其中 则表示ownMenu是这个路径的延展或分枝
			if(parentInAllOpen === allOpenMenu.length - 1) { // 如果是延展则不进行关闭动画
				openMenu(ownMenu);
			}else {	// 如果是分支 则先关闭父菜单下的第一个子菜单 然后再执行路径补全 再执行打开菜单
				closeMenu(allOpenMenu[parentInAllOpen+1], complete(allOpenMenu, parentInAllOpen, openMenu, ownMenu));
			}
		}else{	// ownMenu 和 parentMenu都不在打开路径中 证明点击的是导航栏
			closeMenu(allOpenMenu[0], complete(allOpenMenu, -1, openMenu, ownMenu));
		}

		// 重塑菜单路径
		function complete(allOpenMenu, openLength, callBack, cbParam){
			return function (){
				clearAllOpen();	// 清空所有的open		
				if (openLength > -1){ // 重新补全open路径
					for(let i=0; i<=openLength; i++){
						$(allOpenMenu[i]).addClass('open');
					}
				}
				callBack && callBack(cbParam);
			}
		}
	}

	function closeMenu(menu, completeCallBack){
		const toClose = true;
		anime(menu, toClose, completeCallBack);	// anime异步 所以动画之后的后续操作只能都放在回调函数
	}

	function openMenu(menu){
		const toClose = false;
		anime(menu, toClose, null);
	}

	function anime(menu, toClose, completeCallBack){
		let s_height, d_height; 
		if(toClose){
			s_height = $(menu).addClass('open').height();
			d_height = 0;
		}else {
			s_height = 0;
			d_height = $(menu).addClass('open').height();
		}
	
		$(menu).height(s_height);
		$(menu).addClass('sdm-collapsing')['height'](d_height);
		if(!$.support.transition){
			$(menu).removeClass('sdm-collapsing')['height']('');
			completeCallBack && completeCallBack();
		}else{
			$(menu).one("bsTransitionEnd", function(){
				$(menu).removeClass('sdm-collapsing')['height']('');
				completeCallBack && completeCallBack();
			})
		}
	}

	function clearAllOpen(){
		$('.sdm-dropdown-menu.open').each(function(){
			$(this).removeClass('open');
		});
	}

	function closeAllMenu(){
		clearAllOpen();
		$('[data-toggle="collapse"]').hasClass('collapsed') || $('[data-toggle="collapse"]').trigger('click.bs.collapse.data-api');	// 触发collapse关闭
	}
}();


/*
	1 获得点击的元素 ？ 判断 被点击的是选项 还是子菜单标题？ 还是空白处
		1.1 如果是选项 直接执行 全局 清除 open。 因为 已经选了就代表菜单结束
		1.2 如果是子菜单标题 增看 下文 2 中的内容
		1.3 如果是非菜单区域 则看下文 3 种内容
	2 判断打开 还是 关闭
		2.1 关闭 如果是关闭 则  判断 动画执行位置  （距离当前点击目标最近的下级菜单）
				关闭 可以理解为 点击了当前 菜单已展开路径中的一项 也就是说 如果你点击的东西有open类 那就是要关闭 

		2.2 打开 
				2.2.1 关闭 执行关闭动画 距离点击目标最近的下级菜单
				2.2.2 打开 执行展开动画 展开点击目标最近的下级菜单
	
	3 特例 点击菜单之外的区域直接关闭菜单 （是否执行动画待定）

	分解 2.1
		如何判断是关闭？  被点击的目标 是open 路径中的一个元素 则代表这个东西必然已经是开着的 所以关闭 

		判断是否进行关闭动画？  只要是单纯的关闭都会执行

		执行关闭动画？  因为 点击的目标是<a>元素 所以实际上需要拿到<a>的兄弟元素<ul> 这个才是有open状态的东西 给他执行一次动画就行了

		怎么确定关闭动画执行位置？  如果确定是单纯关闭状态 就是关闭点击的那个 菜单

		补充：执行动画后 需要 执行一次全局 清open  因为不清理open 无法保证展开路径中 不残留多余的open类


	分解 2.2
		如何判断是打开？  首先 被点击的目标没有open类 证明此前 确实是关闭状态， 然后再判断其父菜单是否为open状态 如果 其父为open 则证明
						是同一个路径下的延展， 如果不是 则证明 是打点击了另一个导航栏标题
		
		判断是否进行关闭动画？ 获得所有带有open的菜单 然后遍历这个数组 并与被点击的元素的父菜单做比较 一旦出现一致情况 则可以判断 动画
							在哪执行

							option 1 与最后一个数组元素一致  表示将要展开的菜单是最后一个展开菜单的子菜单 （则不进行关闭动画）

							option 2 点击目标的父菜单 与数组中 任意一个菜单一致 但不是最后一个 则在一致的那个后面的菜单 执行关闭动画

							option 3 如果所有数组元素 都与点击目标不一致 则认为 是打开了另一个导航栏菜单  则 动画在 数组中第一个菜单上执行

							补充 同样关闭动画完成后 执行全局清理open 

		打开动画执行位置？  除了单纯关闭之外 都需要执行打开动画	 执行位置就是点击的那个元素对应的菜单
							补充 因为之前一步清理了所有open 所以 在执行打开动画之前 需要 先补上所有的上级菜单路径的open类

							补充方式 为 获得 点击目标中的href 这个东西的值 是 它这条路径的根菜单的id 就是导航选项的id ，然后获得
							这个id对应的所有 子菜单  然后用被点击元素的父菜单 与这个数组做比较 比较的过程中给每个元素 增加open类
							直到遍历到一致 为止，  

							特例  在进行遍历之前  应该先获得点击目标的父菜单 如果发现其 父菜单没有 sdm-dropdown-menu
							类 则直接执行打开动画 不必进行便利过程

	分解 3  
		什么是特例？ 只要点击的目标不是菜单中的内容 都算特例
		如何处理特例？  step1 全局执行清除open， step2 执行trigger 触发 collapse组件的按钮， 触发前判断 collapse的状态 是否在
						小屏幕 且展开折叠的情况下  如果不是 则仅执行 step1
*/













