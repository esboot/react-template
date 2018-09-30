import React from 'react';
import ReactDOM from 'react-dom';
import './global-css/main.scss';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { configureStore, history } from './store';
import App from './app';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      <Router>
        <App />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
