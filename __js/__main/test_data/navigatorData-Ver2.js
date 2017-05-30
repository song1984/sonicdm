let params = {
		id: 'Navigator_multiMenu',
		logo:{
			src: "img/apple-touch-icon.png",
			alt: "SonicDM",
			url: ''
		},
		dropdowns:{
			menus: [
				{
					option:'HomePage',			// 选项名称	required
					mission: 'goto HomePage',		// 请求链接	没有子菜单则required
					submenus: [
						{
							option:'HomePage-1-1',
							mission: 'goto HomePage-1-1',
							submenus: [
								{
									option: 'HomePage-1-1-1',
									mission: 'goto HomePage-1-1-1',
								},
								{
									option: 'HomePage-1-1-2',
									mission: 'goto HomePage-1-1-2',
								},
							]
						}
					]
				},
				{
					option:'Service',
					mission: 'goto Service'
				},
				{
					option:'Support',
					mission: 'goto Support'
				},{
					option:'About',
					mission: '',
					submenus: [
						{
							option:'Kotobukiya(寿屋)',		
							mission: 'goto AAA',
							submenus: [
								{
									option: '从全世界最大的手办展会“Wonder Festival 2017 (冬)Festival 2017 (冬)”',
									mission: 'goto AAA-1',
									submenus: [
										{
											option: 'Alter(阿尔塔)',
											mission: 'goto AAA-1-1',
											submenus: [
												{
													option: 'AAA-1-1-1',
													mission: 'goto AAA-1-1-1',
												},

											]
										}
									]
								},{
									option: 'AAA-2',
									mission: 'goto AAA-2',
									submenus: [
										{
											option: 'AAA-2-1',
											mission: 'goto AAA-2-1',
										}
									]
								},
							]
						},
						{
							option:'BBB',		
							mission: 'goto BBB',
						}
					]
				}
			],
			url: 'url xxx'		// 如果没有传menus 则通过url获得
		}
	}


export default params



