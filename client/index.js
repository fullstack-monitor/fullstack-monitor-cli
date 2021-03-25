import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// uncomment so that webpack can bundle styles
/* eslint-disable no-unused-vars */
import './scss/application.scss';

render(
  <App />,
  document.getElementById('root'),
);
