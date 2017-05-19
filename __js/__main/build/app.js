'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Navigator = require('./component/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_reactDom2.default.render(_react2.default.createElement(_Navigator2.default, {
	dropdowns: dropdowns,
	logo: logo
}), document.getElementById("pad"));