import React from 'react';
import { mount } from 'enzyme';

import Carousel from '../source/component/Carousel';

import Navigator from '../source/component/Navigator';

import NavigatorVer2 from '../source/component/Navigator-Ver2.1';


{/* 载入测试数据*/ }
import get_data from '../test_data/TestData';


test('TodoComponent renders the text inside it', () => {
	let app = mount(<NavigatorVer2 params={get_data('NavigatorVer2')} />);
	// app.find('button').simulate('click')

});