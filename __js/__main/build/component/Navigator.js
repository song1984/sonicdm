'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SingleEmitter = require('./SingleEmitter');

var _SingleEmitter2 = _interopRequireDefault(_SingleEmitter);

var _navigatorData = require('../../test_data/navigatorData');

var _navigatorData2 = _interopRequireDefault(_navigatorData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

{/*载入测试数据 */}

var Navigator = function (_Component) {
	_inherits(Navigator, _Component);

	function Navigator() {
		_classCallCheck(this, Navigator);

		return _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).apply(this, arguments));
	}

	_createClass(Navigator, [{
		key: 'componentWillMount',


		/*
  	1. 利用生命周期 获得数据 调用this.get_props()
  	2. 监听 广播 事件	
  */
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

			// 从服务端获得导航栏的所有相关信息，
			var temp_dropdowns = _navigatorData2.default.dropdowns;
			var temp_logo = _navigatorData2.default.logo;

			// 并赋值到this.dropdowns this.logo
			this.dropdowns = temp_dropdowns;
			this.logo = temp_logo;
		}

		/*
  	单击菜单切换不同板块的回掉函数
  */

	}, {
		key: 'plate_switch',
		value: function plate_switch(event) {

			// 通过event获得元素中idx 这个idx对应 props中入参数组的下标，然后读取对应数组元素中的任务信息
			var idx = event.target.dataset.idx;
			var idx_op = event.target.dataset.idx_op;

			// 带有菜单的 点击菜单标题应该直接返回
			var item = this.dropdowns[idx];
			if (item.options != undefined && idx_op == undefined) return;

			// 获得任务
			var mission = idx_op != undefined ? this.dropdowns[idx].options[idx_op].mission : this.dropdowns[idx].mission;
			console.log(mission);
			// 通过第三方组件触发自定义事件，以此方式通知其他组件重新渲染自己
			_SingleEmitter2.default.emit('component', mission);
		}

		/*
  	导航栏菜单
  */

	}, {
		key: 'create_dropdown',
		value: function create_dropdown() {
			var _this2 = this;

			return _react2.default.createElement(
				'ul',
				{ className: 'nav navbar-nav', onClick: this.plate_switch.bind(this) },
				this.dropdowns.map(function (item, idx) {
					return _react2.default.createElement(
						'li',
						{ className: 'dropdown', key: idx },
						_react2.default.createElement(
							'a',
							{ href: '#', 'data-idx': idx, className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button' },
							item.title
						),
						item.options != undefined && item.options.length > 0 ? _react2.default.createElement(
							'ul',
							{ className: 'dropdown-menu', role: 'menu', onClick: _this2.plate_switch.bind(_this2) },
							item.options.map(function (option, idx_op) {
								return _react2.default.createElement(
									'li',
									{ key: idx_op },
									_react2.default.createElement(
										'a',
										{ 'data-idx': idx, 'data-idx_op': idx_op, href: '#' },
										option.name
									)
								);
							})
						) : ''
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
							_react2.default.createElement('img', { src: this.logo.src, style: { height: "100%", width: "auto" }, alt: this.logo.alt })
						),
						_react2.default.createElement(
							'p',
							{ className: 'navbar-text' },
							_react2.default.createElement(
								'strong',
								null,
								this.logo.alt
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'collapse navbar-collapse', id: 'collapsedNav' },
						this.create_dropdown()
					)
				)
			);
		}
	}]);

	return Navigator;
}(_react.Component);

exports.default = Navigator;