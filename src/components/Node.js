import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Spring, animated } from "@react-spring/three";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!prevProps.isVisited && this.props.isVisited) ||
      (!prevProps.partofPath && this.props.partofPath)
    ) {
      console.log(102);
      this.setState({ animateNode: true });
      // console.log(1);
    }
  }

  state = {
    // isWall: this.props.isWall,
    animateNode: false,
  };
  // This reference gives us direct access to the THREE.Mesh object
  // this.ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  func = (result) => {
    // console.log(result.finished);
    if (result.value) {
      if (result.value.color === "white") {
        // console.log(10);
        this.setState({ animateNode: false });
      }
    }
  };

  render() {
    return (
      <mesh
        position={this.props.position}
        ref={this.ref}
        onClick={() => this.props.setWall(this.props.row, this.props.col)}
      >
        {!this.props.isWall ? (
          <planeGeometry args={[0.47, 0.47]} />
        ) : (
          <boxGeometry args={[0.5, 0.5, 0.75]} />
        )}

        {this.state.animateNode && !this.props.isEnd && !this.props.isStart ? (
          <Spring
            from={{ color: this.props.animateFromColor }}
            to={{ color: this.props.animateToColor }}
            config={{ duration: 1000 }}
            onChange={(result) => this.func(result)}
          >
            {(styles) => (
              <animated.meshStandardMaterial
                // color={
                //   this.props.isStart
                //     ? "hotpink"
                //     : this.props.isEnd
                //     ? "blue"
                //     : this.state.isWall
                //     ? "green"
                //     : this.props.isVisited
                //     ? "white"
                //     : "orange"
                // }
                color={styles["color"]}
              />
            )}
          </Spring>
        ) : (
          <animated.meshStandardMaterial
            color={
              this.props.isStart
                ? "hotpink"
                : this.props.isEnd
                ? "blue"
                : this.props.isWall
                ? "green"
                : this.props.isVisited
                ? "white"
                : "orange"
            }
          />
        )}
      </mesh>
    );
  }
}

export default Node;
