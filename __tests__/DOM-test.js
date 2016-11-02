import React from 'react';
import {shallow} from 'enzyme';
import App from '../src/containers/App.js';

it('Check input tag if file is empty', () => {
  const checkApp = shallow(
    <App />
  );
  expect(checkApp.find('input').simulate('onchange', '').hasClass('lineBreak')).toEqual(false);
});

it('Check if node exist', () => {
  const checkApp = shallow(
    <App />
  );
  console.log(checkApp.contains(<div className="divLine" />));
  expect(checkApp.contains(<div className="divLine" />)).toEqual(true);
});