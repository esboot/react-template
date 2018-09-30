import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

require('../global-css/main.scss');
import './demo.scss';

class Demo extends React.Component {
  state = {};

  render() {
    const { dispatch, appState: { data } } = this.props;
    return (<div styleName="hello">
      Hello React!
      <button onClick={() => dispatch(syncAction(`You click me! ${Math.random()}`))}>
        click me!
      </button>
    </div>);
  }
}


function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

const DemoWrap = connect(mapStateToProps)(App);

export default DemoWrap

var e = document.createElement('div')
document.body.appendChild(e);
ReactDOM.render(<Demo />, e);
