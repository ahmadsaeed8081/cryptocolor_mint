import { ColorPicker } from "react-color-palette";
// import "react-color-palette/lib/css/styles.css";
import "./Color.css";
const Color = ({ color, setColor }) => {
  return (
    <ColorPicker
      width={223}
      height={165}
      color={color}
      onChange={setColor}
      hideHSV={true}
      hideRGB={false}
      dark
    />
  );
};

export default Color;
