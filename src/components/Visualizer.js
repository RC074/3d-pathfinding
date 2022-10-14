import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "./CameraController";

const Visualizer = ({ grid }) => {
  return (
    <Canvas>
      <CameraController />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {grid.map((row) => {
        return row.map((node) => {
          console.log(node);
          return node;
        });
      })}
    </Canvas>
  );
};

export default Visualizer;
