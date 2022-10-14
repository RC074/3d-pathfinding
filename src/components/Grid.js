import { useEffect, useState } from "react";
import Node from "./Node";

export const Grid = () => {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(new Node());
      }
      grid.push(row);
    }
  }, []);
};
