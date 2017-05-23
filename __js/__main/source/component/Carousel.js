import React, {Component} from 'react';

{/* 载入测试数据 */}
import carousel_data from '../../test_data/carouselData';

class Carousel extends Component {

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
	componentWillMount() {
		
		// 测试数据使用
		this.setState(carousel_data);

		// 正式数据使用
		// let _data = this.props.carousel_data;
		// ( "pics" in _data && _data.pics !== undefined && _data.pics.length > 0 ) 
		// ? this.setState({id: _data.id, pics: _data.pics})
		// : ;// 执行url的请求 ajax  ?? 同步异步问题 回掉执行setState

	}

	/*
		轮播（Carousel）项目 就是具体播放的图片内容
	*/
	push_carousel_inner() {

		return (
			<div className="carousel-inner">
			{
				this.state.pics.map((imgs,idx_imgs)=>{
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
					this.state.pics.map((pic,idx) => {
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

export default Carousel