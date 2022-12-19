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
    if (!prevProps.isWall && this.props.isWall && this.state.z === 0.25) {
      this.setState({ animateWall: true, z: 0 });
    }
  }

  state = {
    // isWall: this.props.isWall,
    animateNode: false,
    animateWall: false,
    z: 0.25,
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
      if (
        result.value.color === "lightblue" ||
        result.value.color === "yellow"
      ) {
        this.setState({ animateNode: false });
      }
    }
  };

  handleChangeWall = (result) => {
    // console.log(result);
    this.setState({ z: result.value.z });
    if (result.value.z === 0.25) {
      this.setState({ animateWall: false });
    }
  };

  determineColor = () => {
    return this.props.isStart
      ? "hotpink"
      : this.props.isEnd
      ? "blue"
      : this.props.isWall
      ? "grey"
      : this.props.partofPath
      ? "yellow"
      : this.props.isVisited
      ? "lightblue"
      : "orange";
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
          <planeGeometry args={[0.47, 0.47]} />
        ) : this.state.animateWall ? (
          <Spring
            from={{ z: 0 }}
            to={{ z: 0.25 }}
            config={{ duration: 500 }}
            onChange={(result) => this.handleChangeWall(result)}
          >
            {(styles) => (
              <animated.boxGeometry args={[0.5, 0.5, this.state.z]} />
            )}
          </Spring>
        ) : (
          <boxGeometry args={[0.5, 0.5, 0.25]} />
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
                color={styles["color"]}
              />
            )}
          </Spring>
        ) : (
          <meshStandardMaterial
            transparent={true}
            opacity={this.determineColor() === "orange" ? 0 : 1}
            color={this.determineColor()}
          />
        )}
      </mesh>
    );
  }
}

export default Node;
