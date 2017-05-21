import Navigator from '../source/component/Navigator';
import React from 'react';
import { mount } from 'enzyme';

test('TodoComponent renders the text inside it', () => {
  const wrapper = mount(
    <Navigator />
  );
  // const p = wrapper.find('button');
  // expect(p.text()).toBe('test');
});