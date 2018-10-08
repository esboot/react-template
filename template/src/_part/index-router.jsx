import React from 'react';
import ReactDOM from 'react-dom';
import './global-css/main.scss';
import { HashRouter as Router } from 'react-router-dom';
import App from './app';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
