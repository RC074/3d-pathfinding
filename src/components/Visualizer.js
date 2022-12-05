import React from "react";
import Node from "./Node";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "./CameraController";
import * as THREE from "three";

const Visualizer = ({ grid, setWall }) => {
  // const visualizeGrid = () => {
  //   return
  // };
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <primitive object={new THREE.AxesHelper(10)} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        {grid.map((row) => {
          return row.map((node) => {
            const { row, col, isStart, isEnd, isVisited, isWall, partofPath } =
              node;
            return (
              <Node
                setWall={(row, col) => setWall(row, col)}
                isStart={isStart}
                isEnd={isEnd}
                isVisited={isVisited}
                isWall={isWall}
                row={row}
                col={col}
                position={[-7 + col * 0.5, 7 - row * 0.5, 0]}
                partofPath={partofPath}
                animateFromColor="pink"
                animateToColor={partofPath ? "yellow" : "white"}
              />
            );
          });
        })}
      </mesh>
    </Canvas>
  );
};

export default Visualizer;
