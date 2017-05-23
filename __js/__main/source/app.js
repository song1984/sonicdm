import React from 'react';
import ReactDom from 'react-dom';
import Navigator from './component/Navigator';
import Button from './component/Button';
import Carousel from './component/Carousel';

ReactDom.render(
	<div>
		<Navigator />
		<Carousel />
		<Button />
	</div>
	,
	document.getElementById("pad")
);