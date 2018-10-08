import React from 'react';
import ReactDOM from 'react-dom';
import './global-css/main.scss';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './app';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
