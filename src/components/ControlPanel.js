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
                  backgroundColor: "#0B6EFD",
                  marginTop: 0,
                  borderTop: "none",
                }}
              >
                <Dropdown.Item
                  onClick={() => this.handleChoosePA("Dijsktra")}
                  style={{ color: "black" }}
                  className="menuItem"
                >
                  Dijsktra
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.handleChoosePA("A* Star")}
                  style={{ color: "black" }}
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
                    ? "lightblue"
                    : "lightgreen",
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
