import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

// Default values shown
<LineSpinner size="40" stroke="3" speed="1" color="black" />;

interface props {
  size?: string;
  stroke?: string;
  speed?: string;
  color?: string;
}

const Loader = ({
  size = "25",
  stroke = "3",
  speed = "1",
  color = "black",
}: props) => {
  return (
    <LineSpinner size={size} color={color} stroke={stroke} speed={speed} />
  );
};

export default Loader;
