import React from "react";
import Visualizer from "./components/Visualizer";
import Node from "./components/Node";
import { dijsktra, shortestPath } from "./algorithms/dijsktra";
import ControlPanel from "./components/ControlPanel";

const START_NODE_ROW = 4;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 29;
const FINISH_NODE_COL = 25;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateInitialGrid(),
      gridToRender: this.generateInitialGrid(),
    };
  }

  componentDidMount() {}

  handleStart = () => {
    console.log(2);
    this.animateDijkstra();
  };

  handleSetWall = (row, col) => {
    console.log(1);
    let temp = [...this.state.grid];
    let temp2 = [...this.state.gridToRender];
    temp[row][col].isWall = !temp[row][col].isWall;
    temp2[row][col].isWall = !temp2[row][col].isWall;
    this.setState({ grid: temp, gridToRender: temp2 });
  };

  animateDijkstra = () => {
    console.log("startanimation");
    const visitedNodesInOrder = dijsktra(
      this.state.grid,
      this.state.grid[START_NODE_ROW][START_NODE_COL],
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        let temp = [...this.state.gridToRender];

        temp[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col] =
          visitedNodesInOrder[i];
        this.setState({ gridToRender: temp });
        console.log(10);
      }, 20 * i);
    }
  };

  generateInitialGrid = () => {
    let grid = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for (let j = 0; j < 30; j++) {
        row.push({
          row: i,
          col: j,
          isWall: i === 10 && 1 < j ? true : false,
          distance: Infinity,
          isStart: i === START_NODE_ROW && j === START_NODE_COL,
          isEnd: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
          isVisited: false,
          prev: null,
        });
      }
      grid.push(row);
    }
    return grid;
  };

  render() {
    return (
      <div id="App">
        <ControlPanel start={this.handleStart} />
        <Visualizer
          setWall={(row, col) => this.handleSetWall(row, col)}
          grid={this.state.gridToRender}
        />
      </div>
    );
  }
}

export default App;
