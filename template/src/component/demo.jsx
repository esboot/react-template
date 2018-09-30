import React from 'react';
import { connect } from 'react-redux';
import { syncAction } from '../model/action';
import './demo.scss';

class Demo extends React.Component {
  state = {};

  render() {
    const { dispatch, appState: { data } } = this.props;
    return (
      <div styleName="hello">
        Hello React! ACDE
        <div>{data}</div>{props.fasdf}
        <button type="button" onClick2={() => dispatch(syncAction(`You click me! ${Math.random()}`))}>
          click me!
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

export default connect(mapStateToProps)(Demo);
