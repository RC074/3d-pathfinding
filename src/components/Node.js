import React, { useRef, useState, useEffect } from "react";
import { Spring, animated } from "@react-spring/three";
import * as THREE from "three";

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
      this.setState({ animateNode: true });
    }
    if (!prevProps.isWall && this.props.isWall && this.state.z === 1) {
      this.setState({ animateWall: true, z: 0 });
    }
  }

  state = {
    // isWall: this.props.isWall,
    animateNode: false,
    animateWall: false,
    z: 1,
  };
  // This reference gives us direct access to the THREE.Mesh object
  // this.ref = useRef();
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  handleChange = (result) => {
    // console.log(result.finished);
    if (result.value) {
      if (result.value.color === "#6be3e3" || result.value.color === "yellow") {
        this.setState({ animateNode: false });
      }
    }
  };

  handleChangeWall = (result) => {
    // console.log(result);
    this.setState({ z: result.value.z });
    if (result.value.z === 1) {
      this.setState({ animateWall: false });
    }
  };

  determineColor = () => {
    return this.props.isStart
      ? "hotpink"
      : this.props.isEnd
      ? "blue"
      : this.props.isWall
      ? "white"
      : this.props.partofPath
      ? "yellow"
      : this.props.isVisited
      ? "#6be3e3"
      : "grey";
  };

  render() {
    return (
      <mesh
        position={this.props.position}
        ref={this.ref}
        onClick={(e) => (
          e.stopPropagation(),
          this.props.setWall(e, this.props.row, this.props.col)
        )}
      >
        {!this.props.isWall ? (
          <planeGeometry args={[1, 1]} />
        ) : this.state.animateWall ? (
          <Spring
            from={{ z: 0 }}
            to={{ z: 1 }}
            config={{ duration: 500 }}
            onChange={(result) => this.handleChangeWall(result)}
          >
            {(styles) => (
              <animated.boxGeometry args={[1.05, 1.05, this.state.z]} />
            )}
          </Spring>
        ) : (
          <boxGeometry args={[1.05, 1.05, 1]} />
        )}

        {this.state.animateNode && !this.props.isEnd && !this.props.isStart ? (
          <Spring
            from={{ color: this.props.animateFromColor }}
            to={{ color: this.props.animateToColor }}
            config={{ duration: 1000 }}
            onChange={(result) => this.handleChange(result)}
          >
            {(styles) => (
              <animated.meshPhongMaterial
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
                emissive={this.determineColor()}
                emissiveIntensity={this.determineColor() === "grey" ? 0 : 0.3}
                transparent={true}
                opacity={this.determineColor() === "grey" ? 0.2 : 1}
                color={styles["color"]}
              />
            )}
          </Spring>
        ) : this.props.isWall ? (
          <meshPhysicalMaterial
            transparent={true}
            opacity={0.8}
            color={this.determineColor()}
          />
        ) : (
          <meshLambertMaterial
            emissive={this.determineColor()}
            emissiveIntensity={this.determineColor() === "grey" ? 0 : 0.3}
            transparent={true}
            opacity={this.determineColor() === "grey" ? 0.2 : 1}
            color={this.determineColor()}
          />
        )}
      </mesh>
    );
  }
}

export default Node;
