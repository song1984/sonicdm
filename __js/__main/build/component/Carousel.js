'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _carouselData = require('../../test_data/carouselData');

var _carouselData2 = _interopRequireDefault(_carouselData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

{/* 载入测试数据 */}

var Carousel = function (_Component) {
	_inherits(Carousel, _Component);

	function Carousel() {
		_classCallCheck(this, Carousel);

		return _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));
	}

	_createClass(Carousel, [{
		key: 'componentWillMount',


		/*
  	处理轮播数据, 轮播数据结构
  	carousel_data={
  		id: "string",
  		pics: [	// 图片对象
  			[
  				{
  					src: "url",
  					alt: "string",
  					herf: "link",
  				},
  			],
  		],
  		url: "url"  // 获得图片的请求地址，这个和pics 必须有一个不为空， 如果同时存在则以pics为准
  	}
  */
		value: function componentWillMount() {

			// 测试数据使用
			this.setState(_carouselData2.default);

			// 正式数据使用
			// let _data = this.props.carousel_data;
			// ( "pics" in _data && _data.pics !== undefined && _data.pics.length > 0 ) 
			// ? this.setState({id: _data.id, pics: _data.pics})
			// : ;// 执行url的请求 ajax  ?? 同步异步问题 回掉执行setState
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
				this.state.pics.map(function (imgs, idx_imgs) {
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
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ id: this.state.id, className: 'carousel slide', 'data-ride': 'carousel' },
				_react2.default.createElement(
					'ol',
					{ className: 'carousel-indicators' },
					this.state.pics.map(function (pic, idx) {
						var class_name = idx === 0 ? "active" : '';
						return _react2.default.createElement('li', { 'data-target': "#" + _this2.state.id, 'data-slide-to': idx, className: class_name, key: idx });
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

exports.default = Carousel;