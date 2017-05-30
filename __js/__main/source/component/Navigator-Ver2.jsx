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
	
		let mission = event.target.dataset.mission;
		if(!mission) return;
		console.log(mission);
		// 通过触发自定义事件通知目标组件更新state
		emitter.emit('component', mission);
	}

	/*
		导航栏菜单标题
	*/
	create_dropdown(menus) { 

		return (
			<ul className="nav navbar-nav" onClick={this.plate_switch.bind(this)}>{
				menus.map((menu,idx)=>{
					let date = new Date();
					let _id = date.getTime() + menu.option;
					let href = '#' + _id;
					let mission = menu.submenus != undefined && menu.submenus.length > 0 ? '' : menu.mission
					return (
						<li className="dropdown sdm-dropdown-root sdm-dropdown-submenu-title" key={idx} id = {_id}>
							<a href = {href}  data-mission={mission}  data-idx={idx} className="sdm-dropdown-toggle" role="button">{menu.option}</a>
							{
								menu.submenus != undefined && menu.submenus.length > 0
								? this.create_dropdown_menu(menu.submenus, href)
								:''
							}
						</li>
					);
				})
			}</ul>
		);			
	}

	/*
		导航栏菜单内容
	*/
	create_dropdown_menu(submenus, href){
		return (
			<ul className = "sdm-dropdown-menu">{
				submenus.map((item, idx) => {
					let _className;
					{/* 如果有子菜单则 给一个 可以显示隐藏下级菜单的样式 如果没有 则给一个点了就消关闭所有已展开级联菜单的样式 */}
					item.submenus != undefined && item.submenus.length > 0
					? _className = "sdm-dropdown-submenu-title"
					: _className = "sdm-dropdown-option" ; 
					let mission = _className == "sdm-dropdown-option" ? item.mission : '';
					return (
						<li key={idx} className = {_className}>
							<a href = {href} data-mission={mission} className = "sdm-dropdown-toggle">{item.option}</a>
							{
								item.submenus != undefined && item.submenus.length > 0
								? this.create_dropdown_menu(item.submenus, href)
								: ''
							}
						</li>
					);
				})
			}
			</ul>
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
						{this.create_dropdown(this.state.dropdowns.menus)}
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
					option: PropTypes.string.isRequired,
					mission: PropTypes.string.isRequired,
					submenus: PropTypes.arrayOf(
						PropTypes.shape({
							option: PropTypes.string.isRequired,
							mission: PropTypes.string.isRequired,
							submenus: PropTypes.string.array
						})
					)
				})
			),
			url: PropTypes.string
		})
	}).isRequired
} 



Navigator.defaultProps = {
	params:{
		id: 'Navigator_multiMenu',
		logo:{
			src: "img/apple-touch-icon.png",
			alt: "SonicDM",
			url: ''
		},
		dropdowns:{
			menus: [
				{
					option:'Products',			// 选项名称	required
					mission: 'goto Products'		// 请求链接	没有子菜单则required
				},
				{
					option:'Service',
					mission: 'goto Service'
				},
				{
					option:'Support',
					mission: 'goto Support'
				},{
					option:'About',
					mission: '',
					submenus: [
						{
							option:'AAA',		
							mission: 'goto AAA',
							submenus: [
								{
									option: 'AAA-1',
									mission: 'goto AAA-1',
									submenus: [
										{
											option: 'AAA-1-1',
											mission: 'goto AAA-1-1',
											submenus: [
												{
													option: 'AAA-1-1-1',
													mission: 'goto AAA-1-1-1',
												},

											]
										}
									]
								},{
									option: 'AAA-2',
									mission: 'goto AAA-2',
									submenus: [
										{
											option: 'AAA-2-1',
											mission: 'goto AAA-2-1',
										}
									]
								},
							]
						},
						{
							option:'BBB',		
							mission: 'goto BBB',
						}
					]
				}
			],
			url: 'url xxx'		// 如果没有传menus 则通过url获得
		}

	}
}



export default Navigator















