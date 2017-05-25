import React, {Component} from 'react';
import PropTypes from 'prop-types';
import httpRequest from './XHR';

class Carousel extends Component {

	// 构造函数
	constructor(props) {
  		super(props);
  		this.state = {
    		id: props.params.id,
    		pics: props.params.pics,
  		};
	}

	/*
		dom生成前加载轮播图数据
	*/
	componentWillMount() {

		this.get_props();
	}

	get_props() {

		let params = this.props.params;

		if(!params.pics.items || !params.pics.items.length){
			httpRequest("get", params.pics.url, null, true, (result)=> {
				this.setState({pics: result});
			}, this);
		}
	}

	/*
		轮播（Carousel）项目 就是具体播放的图片内容
	*/
	push_carousel_inner() {

		return (
			<div className="carousel-inner">
			{
				this.state.pics.items.map((imgs,idx_imgs)=>{
					let class_name = idx_imgs === 0 ? "item active" : "item";
					let _max_width = Math.floor((100 / imgs.length) * 100) / 100+ "%";
					return (
						<div className = { class_name } key={idx_imgs} >
						{	
							imgs.map((img, idx_img) => 
								<a href = {img.href} key = {idx_img} >
									<img src = {img.src} alt = {img.alt} style={{"maxWidth": _max_width, "display": "inline-block"}}/>
								</a>
							)
						}
						</div>
					);
				})
			}
			</div>
		);
	}

	render() {

		return (
			<div id={this.state.id} className="carousel slide" data-ride="carousel">
				{/* 轮播（Carousel）指标  */}
				<ol className="carousel-indicators">
				{
					this.state.pics.items.map((pic,idx) => {
						let class_name = idx === 0 ? "active" : '';
						return ( <li data-target = { "#" + this.state.id } data-slide-to={idx} className = {class_name} key={idx}></li> );
					})
				}
				</ol>

				{/* 轮播（Carousel）插入轮播图片*/}
				{ this.push_carousel_inner() }
				
				{/* 轮播（Carousel）前进后退按钮 */}
				<a className="carousel-control left" href = { "#" + this.state.id } data-slide="prev">
					<span className = "glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span className = "sr-only">Previous</span>
				</a>
				<a className="carousel-control right" href = { "#" + this.state.id } data-slide="next">
					<span className = "glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span className = "sr-only">Next</span>
				</a>
			</div>
		);
	}
}


/*
	数据校验，以下为基本数据结构
*/
Carousel.propTypes = {
	params: PropTypes.shape({
				id: PropTypes.string.isRequired,
				pics: PropTypes.shape({
					items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
						src: PropTypes.string.isRequired,
						alt: PropTypes.string.isRequired,
						href: PropTypes.string.isRequired
					}))),
					url: PropTypes.string
				})
			}).isRequired
}

/*
	默认演示数据 以下为数据结构
*/

Carousel.defaultProps = {
	params: {
		id: "Carousel-Demonstration",	// 轮播标记组的id
		pics:{
			items: [							// 二维数组，表示每个轮播项可以是一个或任意多个图片
				[
					{
						src: "./img/1.jpg",
						alt: "Demonstration 1",
						href: "#"
					}
				],
				[
					{
						src: "./img/4.jpg",
						alt: "Demonstration 2",
						href: "#"
					}
				],
				[
					{
						src: "./img/5.jpg",
						alt: "Demonstration 3",
						href: "#"
					}
				],
			],
			url: "#"	// 获得图片的请求地址，这个和pics 必须有一个不为空， 如果同时存在则以pics为准
		}
	}
}

export default Carousel

