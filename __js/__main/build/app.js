'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Navigator = require('./component/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _Button = require('./component/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
	'div',
	null,
	_react2.default.createElement(_Navigator2.default, null),
	_react2.default.createElement(_Button2.default, null)
), document.getElementById("pad"));