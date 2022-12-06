import React, { useEffect, useRef, useState } from "react";
import Node from "./Node";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraController } from "./CameraController";
import { useSpring, Spring, animated } from "@react-spring/three";
import * as THREE from "three";

const Visualizer = ({ grid, setWall }) => {
  // const visualizeGrid = () => {
  //   return
  // };

  const [resetCamera, setResetCamera] = useState(true);

  const vec = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const markRef = useRef();

  useFrame(({ camera, pointer, scene }) => {
    if (resetCamera) {
      camera.lookAt(markRef.current.position);
      // console.log(camera.position);
      camera.position.lerp(vec.set(0, 10, 10), 0.01);
      camera.updateProjectionMatrix();
    }
    raycaster.setFromCamera(pointer, camera);
    console.log(raycaster.intersectObjects(scene.children));
    return null;
  });

  useEffect(() => {
    window.addEventListener("mousewheel", () => setResetCamera(false));
    window.addEventListener("mousedown", () => setResetCamera(false));
  }, []);

  return (
    <mesh>
      <CameraController />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <primitive object={new THREE.AxesHelper(10)} />
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
                position={[-7 + col * 0.5, 7 - row * 0.5, 0]}
                partofPath={partofPath}
                animateFromColor="pink"
                animateToColor={partofPath ? "yellow" : "white"}
              />
            );
          });
        })}
      </mesh>
    </mesh>
  );
};

export default Visualizer;
