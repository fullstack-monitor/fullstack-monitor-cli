import { ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {ThemeProvider} from "@chakra-ui/core";

// uncomment so that webpack can bundle styles
/* eslint-disable no-unused-vars */
import './scss/application.scss';

render(
  <ThemeProvider>
  <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
