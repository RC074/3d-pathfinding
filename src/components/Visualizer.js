import React from "react";
import Node from "./Node";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "./CameraController";

const Visualizer = ({ grid }) => {
  // const visualizeGrid = () => {
  //   return
  // };
  console.log(grid);
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      {grid.map((row) => {
        return row.map((node) => {
          const { row, col, isStart, isEnd, isVisited, color } = node;
          return (
            <Node
              isStart={isStart}
              isEnd={isEnd}
              isVisited={isVisited}
              color={color}
              position={[-5 + col * 0.5, 5 - row * 0.5, 0]}
            />
          );
        });
      })}
    </Canvas>
  );
};

export default Visualizer;
