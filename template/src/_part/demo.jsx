import React from 'react';
import './demo.scss';

export default class Demo extends React.Component {
  state = { msg: 'click me' };

  onClick = () => {
    this.setState({ msg: `You click me! ${Math.random()}` });
  };

  render() {
    const { msg } = this.state;
    return (
      <div styleName="hello">
        Hello React!
        <div>{msg}</div>
        <button type="button" onClick={this.onClick}>
          click me!
        </button>
      </div>
    );
  }
}
