import React, {Component} from 'react';
import emitter from './SingleEmitter';
import PropTypes from 'prop-types';
import httpRequest from './XHR';

class Navigator extends Component  {
	
	constructor(props) {
		super(props);
		this.state = {
			id: props.params.id,
			logo: props.params.logo,
			dropdowns: props.params.dropdowns
		};
	}

	/*
		1. 利用生命周期 获得数据 调用this.get_props()
		2. 监听 广播 事件	
	*/
	componentWillMount(){

		this.get_props();

		// 监听自定义事件 ,触发回调
		emitter.addListener('Navigator',(obj) => console.log(obj))
	}

	/*
		载入数据，包括菜单选项，logo信息，这里是组件数据的源头，应保证从这里出去的的数据符合组件函数规范 
	*/
	get_props() {

		var params = this.props.params;

		if(!params.logo.src){
			httpRequest("get", params.logo.url, null, true, (result)=> {
				this.setState({logo:result});
			});
		}
		
		if(!params.dropdowns.menus || !params.dropdowns.menus.length){
			httpRequest("get", params.dropdowns.url, null, true, (result)=> {
				this.setState({dropdowns: result});
			});
		}

	}

	/*
		单击菜单切换不同板块的回掉函数
	*/
	plate_switch(event) {
		
		// 通过event获得元素中idx 这个idx对应 props中入参数组的下标，然后读取对应数组元素中的任务信息
		let idx = event.target.dataset.idx;
		let idx_op = event.target.dataset.idx_op;
		
		// 带有菜单的 点击菜单标题应该直接返回
		let item = this.state.dropdowns.menus[idx];
		if(item.options != undefined && idx_op == undefined) return;

		// 获得任务
		let mission = idx_op != undefined ? this.state.dropdowns.menus[idx].options[idx_op].mission : this.state.dropdowns.menus[idx].mission;
		console.log(mission);
		// 通过第三方组件触发自定义事件，以此方式通知其他组件重新渲染自己
		emitter.emit('component', mission);
	}

	/*
		导航栏菜单
	*/
	create_dropdown() { 

		return (
			<ul className="nav navbar-nav" onClick={this.plate_switch.bind(this)}>{
				this.state.dropdowns.menus.map((item,idx)=>{
					return (
						<li className="dropdown" key={idx} >
							<a href="#"  data-idx={idx} className="dropdown-toggle" data-toggle="dropdown" role="button">{item.title}</a>
							{
								item.options != undefined && item.options.length > 0
								? <ul className="dropdown-menu" role="menu" onClick={this.plate_switch.bind(this)}>
									{
										item.options.map((option,idx_op)=><li key={idx_op}><a data-idx={idx} data-idx_op={idx_op} href="#">{option.name}</a></li>)
									}
									</ul>
								:''
							}
						</li>
					);
				})
			}</ul>
		);			
	}

	render(){

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapsedNav">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a href="#" className="navbar-brand">
							<img src={this.state.logo.src} style={{height:"100%", width:"auto"}}  alt={this.state.logo.alt}/>
						</a>
						<p className="navbar-text"><strong>{this.state.logo.alt}</strong></p>
					</div>
					<div className="collapse navbar-collapse" id="collapsedNav">
						{this.create_dropdown()}
					</div>
				</div>
			</nav>
		);
	}
}

Navigator.propTypes = {
	params: PropTypes.shape({
		id: PropTypes.string.isRequired,
		logo: PropTypes.shape({
			src: PropTypes.string,
			alt: PropTypes.string,
			url: PropTypes.string
		}),
		dropdowns: PropTypes.shape({
			menus: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string.isRequired,
					mission: PropTypes.string.isRequired,
					options: PropTypes.arrayOf(
						PropTypes.shape({
							href: PropTypes.string.isRequired,
							name: PropTypes.string.isRequired,
							mission: PropTypes.string.isRequired
						})
					)
				})
			),
			url: PropTypes.string
		})
	}).isRequired
} 



Navigator.defaultProps = {
	params: {
		logo: {
			src: "img/apple-touch-icon.png",
			alt: "SonicDM",
			url: ''
		},
		dropdowns: {
			menus:[
				{
					title: "Products",
					mission: "get all products"
				},
				{
					title: "Service",
					mission: "goto service"
				},
				{
					title: "Support",
					mission: "goto Support"
				},	
				{
					title: "About",
					mission: '',
					options: [
						{
							href: "Articel",
							name: "AAA",
							mission: "goto AAA"
						},
						{
							href: "BBB",
							name: "BBB",
							mission: "goto BBB"
						},
					]
				}	
			],
			url: ''
		}
	}
}



export default Navigator















