import React, { Component } from "react";

export default class ControlPanel extends Component {
  render() {
    return (
      <div className="ctrlPanel">
        <ul>
          <li>
            <button onClick={this.props.start}>start</button>
          </li>
          <li>
            <button onClick={this.props.start}>start</button>
          </li>
        </ul>
      </div>
    );
  }
}
