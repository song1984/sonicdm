import React from 'react';
import ReactDom from 'react-dom';
import NavigatorVer3 from './component/NavigatorVer3';
import Navigator from './component/Navigator';
import Button from './component/Button';
import Carousel from './component/Carousel';
{/* 载入测试数据 */}
import get_data from '../test_data/TestData';

ReactDom.render(
	<div>
		<NavigatorVer3 params={get_data('NavigatorVer2')}/>
		<Carousel params={get_data('Carousel')}/>
		<Button />
	</div>
	,
	document.getElementById("pad")
);