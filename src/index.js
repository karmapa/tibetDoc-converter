import 'babel-polyfill';
import './index.scss';
import './../assets/App.scss';
import React from 'react';
import {render} from 'react-dom';
import App from './containers/App.js';

render(
  <App />,
  document.getElementById('root')
);
