import React from "react";
import Visualizer from "./components/Visualizer";
import Node from "./components/Node";
import { dijsktra } from "./algorithms/dijsktra";
import { aStar } from "./algorithms/aStar";
import { recursiveDivisionMaze } from "./algorithms/maze";
import { shortestPath } from "./algorithms/helper";
import ControlPanel from "./components/ControlPanel";
import { Canvas } from "@react-three/fiber";

const START_NODE_ROW = 4;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 14;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateInitialGrid(),
      gridToRender: this.generateInitialGrid(),
      selectedPA: dijsktra,
    };
  }

  componentDidMount() {}

  handleStart = async () => {
    await this.setState({
      grid: this.generateInitialGrid(),
    });
    recursiveDivisionMaze(
      this.state.grid,
      2,
      this.state.grid.length - 3,
      2,
      this.state.grid[0].length - 3,
      "horizontal",
      false,
      []
    );
    await this.setState({
      gridToRender: JSON.parse(JSON.stringify(this.state.grid)),
    });
    this.animateDijkstra();
  };

  handleSetWall = (e, row, col) => {
    let temp = [...this.state.grid];
    let temp2 = [...this.state.gridToRender];
    temp[row][col].isWall = !temp[row][col].isWall;
    temp2[row][col].isWall = !temp2[row][col].isWall;
    this.setState({ grid: temp, gridToRender: temp2 });
  };

  animateDijkstra = async () => {
    console.log("startanimation");

    const visitedNodesInOrder = this.state.selectedPA(
      this.state.grid,
      this.state.grid[START_NODE_ROW][START_NODE_COL],
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    const nodesInShortestPath = shortestPath(
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    // console.log(nodesInShortestPath);

    if (nodesInShortestPath.length === 1) {
      console.log("no route");
      return;
    }

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          for (let j = 0; j < nodesInShortestPath.length; j++) {
            setTimeout(() => {
              let temp = [...this.state.gridToRender];

              temp[nodesInShortestPath[j].row][nodesInShortestPath[j].col] =
                nodesInShortestPath[j];
              temp[nodesInShortestPath[j].row][nodesInShortestPath[j].col][
                "partofPath"
              ] = true;
              this.setState({ gridToRender: temp });
            }, 40 * j);
          }
        }, 20 * i + 1000);
      } else {
        setTimeout(() => {
          console.log("hi");
          let temp = [...this.state.gridToRender];

          temp[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col] =
            visitedNodesInOrder[i];
          this.setState({ gridToRender: temp });
        }, 20 * i);
      }
    }
  };

  generateInitialGrid = () => {
    let grid = [];
    for (let i = 0; i < 25; i++) {
      let row = [];
      for (let j = 0; j < 25; j++) {
        row.push({
          row: i,
          col: j,
          // isWall: i === 10 && 1 < j ? true : false,
          isWall: false,
          distance: Infinity,
          f: Infinity,
          isStart: i === START_NODE_ROW && j === START_NODE_COL,
          isEnd: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
          isVisited: false,
          partofPath: false,
          previousNode: null,
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
        <Canvas>
          <Visualizer
            setWall={(e, row, col) => this.handleSetWall(e, row, col)}
            grid={this.state.gridToRender}
          />
        </Canvas>
      </div>
    );
  }
}

export default App;
