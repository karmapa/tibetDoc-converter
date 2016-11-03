import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import App from '../src/containers/App.js';

it('Check input tag if file is undefined', () => {
  const checkApp = mount(
    <App />
  );
  expect(checkApp.find('input').simulate('change', {target: {files: [undefined]}}).hasClass('downLink')).toEqual(false);
});

it('Check input tag if file is not empty', () => {
  const checkApp = mount(
    <App />
  );
  checkApp.find('input').simulate('change', {target: {files: ['abc']}});
  expect(checkApp.hasClass('lineBreak')).toEqual(true);
});

it('Check if node exist', () => {
  const checkApp = shallow(
    <App />
  );
  console.log(checkApp.contains(<div className="divLine" />));
  expect(checkApp.contains(<div className="divLine" />)).toEqual(true);
});