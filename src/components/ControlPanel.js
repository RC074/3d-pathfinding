import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

export default class ControlPanel extends Component {
  state = {
    namePA: "Dijsktra",
    speed: "fast",
  };

  handleChoosePA = (name) => {
    this.setState({ namePA: name });
    this.props.setPA(name);
  };

  handleChangeSpeed = () => {};

  render() {
    return (
      <div className="ctrlPanel">
        <ul>
          <li>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-button">
                {this.state.namePA}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  background: "none",
                  marginTop: 0,
                  borderColor: "#ffa260",
                  borderTop: "none",
                }}
              >
                <Dropdown.Item
                  onClick={() => this.handleChoosePA("Dijsktra")}
                  style={{ color: "#ffa260" }}
                  className="menuItem"
                >
                  Dijsktra
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.handleChoosePA("A* Star")}
                  style={{ color: "#ffa260" }}
                  className="menuItem"
                >
                  A* star
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <button
              className="btn1"
              id="speedControl"
              onClick={this.props.switchSpeed}
              style={{
                backgroundColor:
                  this.props.speed === "fast"
                    ? "hotpink"
                    : this.props.speed === "medium"
                    ? "blue"
                    : "green",
                color: "black",
                width: "120px",
              }}
            >
              {this.props.speed}
            </button>
          </li>
          <li>
            <button className="btn1" onClick={this.props.start}>
              Visualize
            </button>
          </li>
          <li>
            <button className="btn1" onClick={this.props.maze}>
              Random Maze
            </button>
          </li>
          <li>
            <button className="btn1" onClick={this.props.clearPath}>
              Clear Path
            </button>
          </li>
          <li>
            <button className="btn1" onClick={this.props.resetGrid}>
              Reset Plane
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
