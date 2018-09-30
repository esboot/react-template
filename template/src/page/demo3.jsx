import React from 'react';
import ReactDOM from 'react-dom';
require('../global-css/main.scss');
import './demo3.scss';

class Demo extends React.Component {
  state = {};

  componentDidMount() {
    debugger
  }
  render() {
    return (<div styleName="hello2">Hello React 3333!</div>);
  }
}


var e = document.createElement('div')
document.body.appendChild(e);
ReactDOM.render(<Demo />, e);
