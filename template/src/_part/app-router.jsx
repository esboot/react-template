import React from 'react';
import { hot } from 'react-hot-loader/root'; // eslint-disable-line
import { Route, Link } from 'react-router-dom';
import Demo from './component/demo';

const App = () => (
  <div>
    <Route path="/" exact render={() => <Link to="/demo">to demo</Link>} />
    <Route path="/demo" component={Demo} />
  </div>
);

export default hot(App);
