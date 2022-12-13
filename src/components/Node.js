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
      // console.log(1);
    }
  }

  state = {
    // isWall: this.props.isWall,
    animateNode: false,
    tileClicked: false,
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
      if (result.value.color === "pink" || result.value.color === "yellow") {
        this.setState({ animateNode: false });
      }
    }
  };

  determineColor = () => {
    return this.props.isStart
      ? "hotpink"
      : this.props.isEnd
      ? "blue"
      : this.props.isWall
      ? "green"
      : this.props.partofPath
      ? "yellow"
      : this.props.isVisited
      ? "pink"
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
        ) : (
          <boxGeometry args={[0.5, 0.5, 0.75]} />
        )}

        {this.state.animateNode && !this.props.isEnd && !this.props.isStart ? (
          <Spring
            from={{ color: this.props.animateFromColor }}
            to={{ color: this.props.animateToColor }}
            config={{ duration: 1000 }}
            onChange={(result) => this.handleChange(result)}
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
