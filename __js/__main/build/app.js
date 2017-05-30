'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _NavigatorVer = require('./component/NavigatorVer3');

var _NavigatorVer2 = _interopRequireDefault(_NavigatorVer);

var _Navigator = require('./component/Navigator');

var _Navigator2 = _interopRequireDefault(_Navigator);

var _Button = require('./component/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Carousel = require('./component/Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _TestData = require('../test_data/TestData');

var _TestData2 = _interopRequireDefault(_TestData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{/* 载入测试数据 */}


_reactDom2.default.render(_react2.default.createElement(
	'div',
	null,
	_react2.default.createElement(_NavigatorVer2.default, { params: (0, _TestData2.default)('NavigatorVer2') }),
	_react2.default.createElement(_Carousel2.default, { params: (0, _TestData2.default)('Carousel') }),
	_react2.default.createElement(_Button2.default, null)
), document.getElementById("pad"));