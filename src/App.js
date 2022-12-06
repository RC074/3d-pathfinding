import React from "react";
import Visualizer from "./components/Visualizer";
import Node from "./components/Node";
import { dijsktra, shortestPath } from "./algorithms/dijsktra";
import ControlPanel from "./components/ControlPanel";
import { Canvas } from "@react-three/fiber";

const START_NODE_ROW = 4;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 20;

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

  handleSetWall = async (e, row, col) => {
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
    const nodesInShortestPath = shortestPath(
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    console.log(nodesInShortestPath);
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
              console.log(
                temp[nodesInShortestPath[j].row][nodesInShortestPath[j].col]
              );
              this.setState({ gridToRender: temp });
            }, 40 * j);
          }
        }, 21 * i);
      } else {
        setTimeout(() => {
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
