import React from 'react';
import ReactDom from 'react-dom';
import Navigator from './component/Navigator';

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
	src: "./img/apple-touch-icon.png",
	alt: "SonicDM"
}

ReactDom.render(
	<Navigator 
		dropdowns = {dropdowns}
		logo = {logo}
	/>
	,
	document.getElementById("pad")
);