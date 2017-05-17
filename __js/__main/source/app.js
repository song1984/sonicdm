import React from 'react';
import ReactDom from 'react-dom';
import Button from './component/Button';

ReactDom.render(
	<Button 
		name={'Test'}
	/>
	,
	document.getElementById("pad")
);