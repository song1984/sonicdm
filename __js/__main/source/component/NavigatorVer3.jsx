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
		
		// let mission = event.target.dataset.mission; // lte IE 10 不支持
		let mission = event.target.getAttribute("data-mission");
		if(!mission) return;
		console.log(mission);
		// 通过触发自定义事件通知目标组件更新state
		emitter.emit('component', mission);
	}

	/*
		导航栏菜单标题
	*/
	create_dropdown(menus, rootMenuId, isFirst) { 
		let ul_className, _onclick, li_className, _li_className, date, _rootMenuId, _isFirst;
		if(isFirst && rootMenuId){ // 第一层递归走这个
			ul_className = "sdm-dropdown-menu sdm-root-menu";
			_isFirst = false;
		}else if(isFirst){	// render 时先走这个
			ul_className = "nav navbar-nav";
			_onclick = this.plate_switch.bind(this);
			_li_className = "sdm-dropdown-root";
			date = new Date().getTime();
			_isFirst = true;
		}else {	// 第二层开始以后的递归 用这个
			ul_className = "sdm-dropdown-menu";
			_onclick = '';
			_isFirst = false;
		}
		return (
			<ul className={ ul_className } onClick={_onclick} >{
				menus.map((menu,idx)=>{
					let mission = menu.submenus != undefined && menu.submenus.length > 0 ? '' : menu.mission;
					
					_isFirst 
					? menu.submenus != undefined && menu.submenus.length > 0 
						? li_className = _li_className + " sdm-dropdown-submenu-title"
						: li_className = _li_className + " sdm-dropdown-option"
					: menu.submenus != undefined && menu.submenus.length > 0 
						? li_className = "sdm-dropdown-submenu-title"
						: li_className = "sdm-dropdown-option";
					
					_isFirst ? _rootMenuId = date + menu.option : _rootMenuId = rootMenuId;

					return (
						<li className={ li_className } key={idx} id = {_rootMenuId}>
							<a href = {"#"+_rootMenuId}  data-mission={mission}  data-idx={idx} className="sdm-dropdown-toggle" role="button">
								{menu.option}
								{li_className.indexOf("sdm-dropdown-submenu-title") > -1 ? <div className="caret-fixed" ><span className="sdm-caret"></span></div> : ''}
							</a>
							{
								menu.submenus != undefined && menu.submenus.length > 0
								? this.create_dropdown(menu.submenus, _rootMenuId, _isFirst)
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
						{this.create_dropdown(this.state.dropdowns.menus, null, true)}
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















