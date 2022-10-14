import React from "react";
import Visualizer from "./components/Visualizer";
import Node from "./components/Node";

class App extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(<Node position={[0, 0, 0]} />);
      }
      this.state.grid.push(row);
    }
  }

  state = {
    grid: [],
  };
  componentDidMount() {
    console.log(this.state.grid);
  }
  render() {
    return (
      <div id="App">
        <Visualizer grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
