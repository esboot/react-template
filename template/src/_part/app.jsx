import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import Demo from './component/demo';

const App = () => (
  <div>
    <Demo />
  </div>
);

export default hot(module)(App);
