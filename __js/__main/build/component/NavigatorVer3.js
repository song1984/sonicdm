'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SingleEmitter = require('./SingleEmitter');

var _SingleEmitter2 = _interopRequireDefault(_SingleEmitter);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _XHR = require('./XHR');

var _XHR2 = _interopRequireDefault(_XHR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigator = function (_Component) {
	_inherits(Navigator, _Component);

	function Navigator(props) {
		_classCallCheck(this, Navigator);

		var _this = _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this, props));

		_this.state = {
			id: props.params.id,
			logo: props.params.logo,
			dropdowns: props.params.dropdowns
		};
		return _this;
	}

	/*
 	1. 利用生命周期 获得数据 调用this.get_props()
 	2. 监听 广播 事件	
 */


	_createClass(Navigator, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			this.get_props();

			// 监听自定义事件 ,触发回调
			_SingleEmitter2.default.addListener('Navigator', function (obj) {
				return console.log(obj);
			});
		}

		/*
  	载入数据，包括菜单选项，logo信息，这里是组件数据的源头，应保证从这里出去的的数据符合组件函数规范 
  */

	}, {
		key: 'get_props',
		value: function get_props() {
			var _this2 = this;

			var params = this.props.params;

			if (!params.logo.src) {
				(0, _XHR2.default)("get", params.logo.url, null, true, function (result) {
					_this2.setState({ logo: result });
				});
			}

			if (!params.dropdowns.menus || !params.dropdowns.menus.length) {
				(0, _XHR2.default)("get", params.dropdowns.url, null, true, function (result) {
					_this2.setState({ dropdowns: result });
				});
			}
		}

		/*
  	单击菜单切换不同板块的回掉函数
  */

	}, {
		key: 'plate_switch',
		value: function plate_switch(event) {

			// let mission = event.target.dataset.mission; // lte IE 10 不支持
			var mission = event.target.getAttribute("data-mission");
			if (!mission) return;
			console.log(mission);
			// 通过触发自定义事件通知目标组件更新state
			_SingleEmitter2.default.emit('component', mission);
		}

		/*
  	导航栏菜单标题
  */

	}, {
		key: 'create_dropdown',
		value: function create_dropdown(menus, rootMenuId, isFirst) {
			var _this3 = this;

			var ul_className = void 0,
			    _onclick = void 0,
			    li_className = void 0,
			    _li_className = void 0,
			    date = void 0,
			    _rootMenuId = void 0,
			    _isFirst = void 0;
			if (isFirst && rootMenuId) {
				// 第一层递归走这个
				ul_className = "sdm-dropdown-menu sdm-root-menu";
				_isFirst = false;
			} else if (isFirst) {
				// render 时先走这个
				ul_className = "nav navbar-nav";
				_onclick = this.plate_switch.bind(this);
				_li_className = "sdm-dropdown-root";
				date = new Date().getTime();
				_isFirst = true;
			} else {
				// 第二层开始以后的递归 用这个
				ul_className = "sdm-dropdown-menu";
				_onclick = '';
				_isFirst = false;
			}
			return _react2.default.createElement(
				'ul',
				{ className: ul_className, onClick: _onclick },
				menus.map(function (menu, idx) {
					var mission = menu.submenus != undefined && menu.submenus.length > 0 ? '' : menu.mission;

					_isFirst ? menu.submenus != undefined && menu.submenus.length > 0 ? li_className = _li_className + " sdm-dropdown-submenu-title" : li_className = _li_className + " sdm-dropdown-option" : menu.submenus != undefined && menu.submenus.length > 0 ? li_className = "sdm-dropdown-submenu-title" : li_className = "sdm-dropdown-option";

					_isFirst ? _rootMenuId = date + menu.option : _rootMenuId = rootMenuId;

					return _react2.default.createElement(
						'li',
						{ className: li_className, key: idx, id: _rootMenuId },
						_react2.default.createElement(
							'a',
							{ href: "#" + _rootMenuId, 'data-mission': mission, 'data-idx': idx, className: 'sdm-dropdown-toggle', role: 'button' },
							menu.option,
							li_className.indexOf("sdm-dropdown-submenu-title") > -1 ? _react2.default.createElement(
								'div',
								{ className: 'caret-fixed' },
								_react2.default.createElement('span', { className: 'sdm-caret' })
							) : ''
						),
						menu.submenus != undefined && menu.submenus.length > 0 ? _this3.create_dropdown(menu.submenus, _rootMenuId, _isFirst) : ''
					);
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'nav',
				{ className: 'navbar navbar-default' },
				_react2.default.createElement(
					'div',
					{ className: 'container-fluid' },
					_react2.default.createElement(
						'div',
						{ className: 'navbar-header' },
						_react2.default.createElement(
							'button',
							{ type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#collapsedNav' },
							_react2.default.createElement(
								'span',
								{ className: 'sr-only' },
								'Toggle navigation'
							),
							_react2.default.createElement('span', { className: 'icon-bar' }),
							_react2.default.createElement('span', { className: 'icon-bar' }),
							_react2.default.createElement('span', { className: 'icon-bar' })
						),
						_react2.default.createElement(
							'a',
							{ href: '#', className: 'navbar-brand' },
							_react2.default.createElement('img', { src: this.state.logo.src, style: { height: "100%", width: "auto" }, alt: this.state.logo.alt })
						),
						_react2.default.createElement(
							'p',
							{ className: 'navbar-text' },
							_react2.default.createElement(
								'strong',
								null,
								this.state.logo.alt
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'collapse navbar-collapse', id: 'collapsedNav' },
						this.create_dropdown(this.state.dropdowns.menus, null, true)
					)
				)
			);
		}
	}]);

	return Navigator;
}(_react.Component);

Navigator.propTypes = {
	params: _propTypes2.default.shape({
		id: _propTypes2.default.string.isRequired,
		logo: _propTypes2.default.shape({
			src: _propTypes2.default.string,
			alt: _propTypes2.default.string,
			url: _propTypes2.default.string
		}),
		dropdowns: _propTypes2.default.shape({
			menus: _propTypes2.default.arrayOf(_propTypes2.default.shape({
				option: _propTypes2.default.string.isRequired,
				mission: _propTypes2.default.string.isRequired,
				submenus: _propTypes2.default.arrayOf(_propTypes2.default.shape({
					option: _propTypes2.default.string.isRequired,
					mission: _propTypes2.default.string.isRequired,
					submenus: _propTypes2.default.string.array
				}))
			})),
			url: _propTypes2.default.string
		})
	}).isRequired
};

Navigator.defaultProps = {
	params: {
		id: 'Navigator_multiMenu',
		logo: {
			src: "img/apple-touch-icon.png",
			alt: "SonicDM",
			url: ''
		},
		dropdowns: {
			menus: [{
				option: 'Products', // 选项名称	required
				mission: 'goto Products' // 请求链接	没有子菜单则required
			}, {
				option: 'Service',
				mission: 'goto Service'
			}, {
				option: 'Support',
				mission: 'goto Support'
			}, {
				option: 'About',
				mission: '',
				submenus: [{
					option: 'AAA',
					mission: 'goto AAA',
					submenus: [{
						option: 'AAA-1',
						mission: 'goto AAA-1',
						submenus: [{
							option: 'AAA-1-1',
							mission: 'goto AAA-1-1',
							submenus: [{
								option: 'AAA-1-1-1',
								mission: 'goto AAA-1-1-1'
							}]
						}]
					}, {
						option: 'AAA-2',
						mission: 'goto AAA-2',
						submenus: [{
							option: 'AAA-2-1',
							mission: 'goto AAA-2-1'
						}]
					}]
				}, {
					option: 'BBB',
					mission: 'goto BBB'
				}]
			}],
			url: 'url xxx' // 如果没有传menus 则通过url获得
		}
	}
};

exports.default = Navigator;