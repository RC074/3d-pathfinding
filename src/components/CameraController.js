import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";

const effectController = {
  turbidity: 10,
  rayleigh: 3,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.7,
  elevation: 5,
  azimuth: 179.5,
  exposure: 0.9,
};

export const CameraController = () => {
  const { camera, gl, scene } = useThree();
  let sky, sun;
  sky = new Sky();
  sky.scale.setScalar(450000);
  sun = new THREE.Vector3();

  useEffect(() => {
    scene.fog = new THREE.Fog(0xffffff, 0, 750);
    scene.background = new THREE.Color(0xbbd6ff);
    camera.position.set(0, 60, 20);
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 1;
    // controls.maxDistance = 15;

    controls.maxPolarAngle = 1.5;

    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = effectController.exposure;

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);
    uniforms["sunPosition"].value.copy(sun);
    scene.add(sky);

    return () => {
      controls.dispose();
    };
  }, [camera, gl, scene]);
  return null;
};
