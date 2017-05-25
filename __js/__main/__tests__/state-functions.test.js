import React from 'react';
import { mount } from 'enzyme';

import Carousel from '../source/component/Carousel';

import Navigator from '../source/component/Navigator';

{/* 载入测试数据*/ }
import get_data from '../test_data/TestData';


test('TodoComponent renders the text inside it', () => {
	let app = mount(<Navigator params={get_data('Navigator')} />);
	// app.find('button').simulate('click')

});