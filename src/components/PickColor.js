import React from "react";
import { SketchPicker } from "react-color";
var inputStyles = {
  backgroundColor: "#000 !important",
};
class Component extends React.Component {
  render() {
    return <SketchPicker style={inputStyles} />;
  }
}
export default Component;
