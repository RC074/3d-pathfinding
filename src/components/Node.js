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
      <mesh
        position={this.props.position}
        ref={this.ref}
        onPointerOver={(event) => this.setState({ hovered: true })}
        onPointerOut={(event) => this.setState({ hovered: false })}
      >
        <planeGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={this.state.hovered ? "hotpink" : "orange"}
        />
      </mesh>
    );
  }
}

export default Node;
