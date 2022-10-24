import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    hovered: false,
  };
  // This reference gives us direct access to the THREE.Mesh object
  // this.ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  render() {
    return (
      <mesh position={this.props.position} ref={this.ref}>
        <planeGeometry args={[0.45, 0.45]} />
        <meshStandardMaterial
          color={
            this.props.isStart
              ? "hotpink"
              : this.props.isEnd
              ? "blue"
              : this.props.isVisited
              ? "white"
              : "orange"
          }
        />
      </mesh>
    );
  }
}

export default Node;
