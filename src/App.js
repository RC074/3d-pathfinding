import React from "react";
import Visualizer from "./components/Visualizer";
import { dijsktra } from "./algorithms/dijsktra";
import { aStar } from "./algorithms/aStar";
import { recursiveDivisionMaze } from "./algorithms/maze";
import { shortestPath } from "./algorithms/helper";
import ControlPanel from "./components/ControlPanel";
import { Canvas } from "@react-three/fiber";
import FPSStats from "react-fps-stats";
import { ToastContainer, toast } from "react-toastify";

const START_NODE_ROW = 4;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 20;
const FINISH_NODE_COL = 20;
const PLAIN_SIZE = 25;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateInitialGrid(),
      gridToRender: this.generateInitialGrid(),
      selectedPA: dijsktra,
      selectedMA: recursiveDivisionMaze,
      speed: "fast",
      animationInProcess: false,
    };
  }

  componentDidMount() {}

  clearPath = () => {
    if (!this.state.animationInProcess) {
      let temp = JSON.parse(JSON.stringify(this.state.grid));
      let temp2 = JSON.parse(JSON.stringify(this.state.gridToRender));
      for (let i = 0; i < this.state.grid.length; i++) {
        for (let j = 0; j < this.state.grid.length; j++) {
          if (!temp[i][j].isWall) {
            temp[i][j].isVisited = false;
            temp2[i][j].isVisited = false;
            temp[i][j].partofPath = false;
            temp2[i][j].partofPath = false;
            temp[i][j].distance = Infinity;
            temp2[i][j].distance = Infinity;
            temp[i][j].f = Infinity;
            temp2[i][j].f = Infinity;
            temp[i][j].previousNode = null;
            temp2[i][j].previousNode = null;
          }
        }
      }
      this.setState({ grid: temp, gridToRender: temp2 });
    } else {
      console.log("hi");
      toast.warn("Animation In Progress", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  handleSwitchSpeed = () => {
    if (this.state.speed === "fast") {
      this.setState({ speed: "medium" });
    } else if (this.state.speed === "medium") {
      this.setState({ speed: "slow" });
    } else {
      this.setState({ speed: "fast" });
    }
  };

  resetGrid = () => {
    if (!this.state.animationInProcess) {
      this.setState({
        grid: this.generateInitialGrid(),
        gridToRender: this.generateInitialGrid(),
      });
    } else {
      toast.warn("Animation In Progress", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  handleSetPA = (name) => {
    if (name === "A* Star") {
      this.setState({ selectedPA: aStar });
    } else {
      this.setState({ selectedPA: dijsktra });
    }
  };

  handleStart = async () => {
    if (!this.state.animationInProcess) {
      this.clearPath();
      this.animatePA();
    } else {
      toast.warn("Animation In Progress", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  handleMaze = async () => {
    if (!this.state.animationInProcess) {
      await this.resetGrid();
      const visitedNodesInOrder = [];

      recursiveDivisionMaze(
        this.state.grid,
        2,
        this.state.grid.length - 3,
        2,
        this.state.grid[0].length - 3,
        "horizontal",
        false,
        visitedNodesInOrder
      );
      this.animateNodesInOrder(visitedNodesInOrder);
    } else {
      toast.warn("Animation In Progress", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  handleSetWall = (e, row, col) => {
    console.log("reach");
    if (
      !this.state.animationInProcess &&
      !(START_NODE_COL === col && START_NODE_ROW === row) &&
      !(FINISH_NODE_COL === col && FINISH_NODE_ROW === row)
    ) {
      // let temp = [...this.state.grid];
      // let temp2 = [...this.state.gridToRender];
      let temp = structuredClone(this.state.grid);
      let temp2 = structuredClone(this.state.gridToRender);
      temp[row][col].isWall = !temp[row][col].isWall;
      temp2[row][col].isWall = !temp2[row][col].isWall;
      this.setState({ grid: temp, gridToRender: temp2 });
    }
  };

  animateSP = (nodesInShortestPath) => {
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
  };

  animateNodesInOrder = (visitedNodesInOrder, nodesInShortestPath = null) => {
    this.setState({ animationInProcess: true });
    setTimeout(
      () => {
        this.setState({ animationInProcess: false });
        // if (nodesInShortestPath === null) {
        //   // so that the walls can be interactive after maze is built (to be fixed)
        //   this.clearPath();
        // }
        console.log("done");
      },
      nodesInShortestPath === null
        ? this.convertSpeed(true) * visitedNodesInOrder.length + 500
        : this.convertSpeed() * visitedNodesInOrder.length +
            1500 +
            nodesInShortestPath.length * 40
    );

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length && nodesInShortestPath) {
        setTimeout(() => {
          this.animateSP(nodesInShortestPath);
        }, this.convertSpeed() * i + 1000);
      } else {
        setTimeout(
          () => {
            let temp = [...this.state.gridToRender];

            if (visitedNodesInOrder[i]) {
              temp[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col] =
                visitedNodesInOrder[i];
            }
            this.setState({ gridToRender: temp });
          },
          nodesInShortestPath === null
            ? this.convertSpeed(true) * i
            : this.convertSpeed() * i
        );
      }
    }
  };

  convertSpeed = (maze = false) => {
    if (maze) {
      return 10;
    } else {
      return this.state.speed === "fast"
        ? 20
        : this.state.speed === "medium"
        ? 80
        : 200;
    }
  };

  animatePA = async () => {
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
      this.clearPath();
      toast.warn("No Route", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // if there is a path, animate the grid
    this.animateNodesInOrder(visitedNodesInOrder, nodesInShortestPath);
  };

  generateInitialGrid = () => {
    let grid = [];
    for (let i = 0; i < PLAIN_SIZE; i++) {
      let row = [];
      for (let j = 0; j < PLAIN_SIZE; j++) {
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
        <FPSStats bottom={10} left={10} top={"auto"} graphWidth={100} />
        <ControlPanel
          switchSpeed={this.handleSwitchSpeed}
          speed={this.state.speed}
          resetGrid={this.resetGrid}
          clearPath={this.clearPath}
          setPA={(name) => this.handleSetPA(name)}
          start={this.handleStart}
          maze={this.handleMaze}
        />
        <Canvas>
          <Visualizer
            setWall={(e, row, col) => this.handleSetWall(e, row, col)}
            grid={this.state.gridToRender}
          />
        </Canvas>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
