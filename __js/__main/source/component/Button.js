import React, {Component} from 'react';
import emitter from './SingleEmitter';

class Button extends Component {
	
	callNavi() {
		emitter.emit('Navigator',100);
	}

	render() {
		return (
			<button onClick={this.callNavi.bind(this)} >test</button>
		);
	}
}

export default Button
