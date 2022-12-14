import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export const CameraController = () => {
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#181919", 0.025);
    camera.position.set(0, 20, 20);
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 1;
    // controls.maxDistance = 15;

    controls.maxPolarAngle = 1.5;

    return () => {
      controls.dispose();
    };
  }, [camera, gl, scene]);
  return null;
};
