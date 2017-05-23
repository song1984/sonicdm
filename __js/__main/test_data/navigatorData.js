let dropdowns = [
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
		options: [
			{
				href: "Articel",
				name: "AAA",
				mission: "goto AAA"
			},
			{
				href: "BBB",
				name: "BBB",
				mission: "goto BBB"
			},
		]
	},	
]

let logo = {
	src: "../img/apple-touch-icon.png",
	alt: "SonicDM"
}

let data = {
	logo: logo,
	dropdowns: dropdowns
}

export default data