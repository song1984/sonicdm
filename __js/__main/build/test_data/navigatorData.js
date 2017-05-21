"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var dropdowns = [{
	title: "Products",
	mission: "get all products"
}, {
	title: "Service",
	mission: "goto service"
}, {
	title: "Support",
	mission: "goto Support"
}, {
	title: "About",
	options: [{
		href: "Articel",
		name: "AAA",
		mission: "goto AAA"
	}, {
		href: "BBB",
		name: "BBB",
		mission: "goto BBB"
	}]
}];

var logo = {
	src: "./img/apple-touch-icon.png",
	alt: "SonicDM"
};

var data = {
	logo: logo,
	dropdowns: dropdowns
};

exports.default = data;