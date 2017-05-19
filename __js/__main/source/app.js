import React from 'react';
import ReactDom from 'react-dom';
import Navigator from './component/Navigator';
import Button from './component/Button'

ReactDom.render(
	<div>
		<Navigator />
		<Button />
	</div>
	,
	document.getElementById("pad")
);