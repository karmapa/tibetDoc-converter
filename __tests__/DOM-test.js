import React from 'react';
import {shallow} from 'enzyme';
import App from '../src/containers/App.js';

it('App input tag changes after read file', () => {
  // Render a checkbox with label in the document
  const checkApp = shallow(
    <App />
  );
  console.log(checkApp.contains(<div className="divLine" />));
  expect(checkApp.contains(<div className="divLine" />)).toEqual(true);
//  expect(checkbox.text()).toEqual('Off');

//  checkbox.find('input').simulate('change');

//  expect(checkbox.text()).toEqual('On');
});