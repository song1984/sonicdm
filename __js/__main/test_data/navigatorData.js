
/*
	多级菜单数据结构
params:{
	id: 'Navigator_multiMenu',
	logo:{
		...
	},
	dropdowns:{
		menus: [
			{
				option:'xxx',			// 选项名称	required
				mission: 'url xxx'		// 请求链接	没有子菜单则required
				submenus: [
					{
						option:'xxx',		
						mission: 'url xxx',
						submenus: [
							.....
						]
					},
					{
						option:'xxx',		
						mission: 'url xxx',
						submenus: [
							.....
						]
					},
					......
				]
			},
			{
				option:'xxx',
				mission: 'url xxx',
				submenus: [
					{
						option:'xxx',		
						mission: 'url xxx',
						submenus: [
							.....
						]
					},
					{
						option:'xxx',		
						mission: 'url xxx',
						submenus: [
							.....
						]
					},
					......
				]
			}
		],
		url: 'url xxx'		// 如果没有传menus 则通过url获得
	}

}




*/





var params = {
		id:'demonstration-navigator',
		logo: {
			src: "img/apple-touch-icon.png",
			alt: "SonicDM",
			url: ''
		},
		dropdowns: {
			menus:[
				{
					title: "Products",
					mission: "get all products"
				},
				{
					title: "Service",
					mission: "goto service"
				},
				{
					title: "Support",
					mission: "goto Support"
				},	
				{
					title: "About",
					mission: '',
					options: [
						{
							href: "Articel",
							name: "AAA",
							mission: "goto AAA"
						},
						{
							href: "CCC",
							name: "CCC",
							mission: "goto CCC"
						},
					]
				}	
			],
			url: ''
		}
	};

export default params