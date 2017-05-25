'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _XHR = require('./XHR');

var _XHR2 = _interopRequireDefault(_XHR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_Component) {
	_inherits(Carousel, _Component);

	// 构造函数
	function Carousel(props) {
		_classCallCheck(this, Carousel);

		var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

		_this.state = {
			id: props.params.id,
			pics: props.params.pics
		};
		return _this;
	}

	/*
 	dom生成前加载轮播图数据
 */


	_createClass(Carousel, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			this.get_props();
		}
	}, {
		key: 'get_props',
		value: function get_props() {
			var _this2 = this;

			var params = this.props.params;

			if (!params.pics.items || !params.pics.items.length) {
				(0, _XHR2.default)("get", params.pics.url, null, true, function (result) {
					_this2.setState({ pics: result });
				}, this);
			}
		}

		/*
  	轮播（Carousel）项目 就是具体播放的图片内容
  */

	}, {
		key: 'push_carousel_inner',
		value: function push_carousel_inner() {

			return _react2.default.createElement(
				'div',
				{ className: 'carousel-inner' },
				this.state.pics.items.map(function (imgs, idx_imgs) {
					var class_name = idx_imgs === 0 ? "item active" : "item";
					var _max_width = Math.floor(100 / imgs.length * 100) / 100 + "%";
					return _react2.default.createElement(
						'div',
						{ className: class_name, key: idx_imgs },
						imgs.map(function (img, idx_img) {
							return _react2.default.createElement(
								'a',
								{ href: img.href, key: idx_img },
								_react2.default.createElement('img', { src: img.src, alt: img.alt, style: { "maxWidth": _max_width, "display": "inline-block" } })
							);
						})
					);
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(
				'div',
				{ id: this.state.id, className: 'carousel slide', 'data-ride': 'carousel' },
				_react2.default.createElement(
					'ol',
					{ className: 'carousel-indicators' },
					this.state.pics.items.map(function (pic, idx) {
						var class_name = idx === 0 ? "active" : '';
						return _react2.default.createElement('li', { 'data-target': "#" + _this3.state.id, 'data-slide-to': idx, className: class_name, key: idx });
					})
				),
				this.push_carousel_inner(),
				_react2.default.createElement(
					'a',
					{ className: 'carousel-control left', href: "#" + this.state.id, 'data-slide': 'prev' },
					_react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-left', 'aria-hidden': 'true' }),
					_react2.default.createElement(
						'span',
						{ className: 'sr-only' },
						'Previous'
					)
				),
				_react2.default.createElement(
					'a',
					{ className: 'carousel-control right', href: "#" + this.state.id, 'data-slide': 'next' },
					_react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-right', 'aria-hidden': 'true' }),
					_react2.default.createElement(
						'span',
						{ className: 'sr-only' },
						'Next'
					)
				)
			);
		}
	}]);

	return Carousel;
}(_react.Component);

/*
	数据校验，以下为基本数据结构
*/


Carousel.propTypes = {
	params: _propTypes2.default.shape({
		id: _propTypes2.default.string.isRequired,
		pics: _propTypes2.default.shape({
			items: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.shape({
				src: _propTypes2.default.string.isRequired,
				alt: _propTypes2.default.string.isRequired,
				href: _propTypes2.default.string.isRequired
			}))),
			url: _propTypes2.default.string
		})
	}).isRequired
};

/*
	默认演示数据 以下为数据结构
*/

Carousel.defaultProps = {
	params: {
		id: "Carousel-Demonstration", // 轮播标记组的id
		pics: {
			items: [// 二维数组，表示每个轮播项可以是一个或任意多个图片
			[{
				src: "./img/1.jpg",
				alt: "Demonstration 1",
				href: "#"
			}], [{
				src: "./img/4.jpg",
				alt: "Demonstration 2",
				href: "#"
			}], [{
				src: "./img/5.jpg",
				alt: "Demonstration 3",
				href: "#"
			}]],
			url: "#" // 获得图片的请求地址，这个和pics 必须有一个不为空， 如果同时存在则以pics为准
		}
	}
};

exports.default = Carousel;