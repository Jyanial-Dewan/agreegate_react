import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

interface props {
  size?: string;
  strock?: string;
  speed?: string;
  color?: string;
}

const Loader = ({ size, strock, speed, color }: props) => {
  return (
    <LineSpinner
      size={size ? size : "25"}
      stroke={strock ? strock : "3"}
      speed={speed ? speed : "1"}
      color={color ? color : "white"}
    />
  );
};

export default Loader;
