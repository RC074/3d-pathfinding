import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(0, 20, 20);
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 1;
    // controls.maxDistance = 15;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
