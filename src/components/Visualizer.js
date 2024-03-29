import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import { useFrame } from "@react-three/fiber";
import { CameraController } from "./CameraController";
import * as THREE from "three";

const Visualizer = ({ grid, setWall }) => {
  // const visualizeGrid = () => {
  //   return
  // };

  const [resetCamera, setResetCamera] = useState(true);

  const vec = new THREE.Vector3();
  const markRef = useRef();

  useFrame(({ camera, pointer, scene }) => {
    if (resetCamera) {
      camera.lookAt(markRef.current.position);
      // console.log(camera.position);
      camera.position.lerp(vec.set(0, 20, 0), 0.03);
      camera.updateProjectionMatrix();
    }
    // raycaster.setFromCamera(pointer, camera);
    // console.log(raycaster.intersectObjects(scene.children));
    return null;
  });

  useEffect(() => {
    window.addEventListener("mousewheel", () => setResetCamera(false));
    window.addEventListener("mousedown", () => setResetCamera(false));
  }, []);
  console.log("rerender");
  return (
    <mesh>
      {/* <gridHelper args={[12.5, 25, "orange", "orange"]} /> */}
      <CameraController />
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, -10]} /> */}
      {/* <primitive object={new THREE.AxesHelper(10)} /> */}
      <mesh ref={markRef} rotation={[-Math.PI / 2, 0, 0]}>
        {grid.map((row) => {
          return row.map((node) => {
            const { row, col, isStart, isEnd, isVisited, isWall, partofPath } =
              node;
            return (
              <Node
                setWall={(e, row, col) => setWall(e, row, col)}
                isStart={isStart}
                isEnd={isEnd}
                isVisited={isVisited}
                isWall={isWall}
                row={row}
                col={col}
                position={[-13 + col * 1.05, 12 - row * 1.05, isWall ? 0.5 : 0]}
                partofPath={partofPath}
                animateFromColor="#E566A4"
                animateToColor={partofPath ? "yellow" : "#6be3e3"}
              />
            );
          });
        })}
      </mesh>
    </mesh>
  );
};

export default Visualizer;
