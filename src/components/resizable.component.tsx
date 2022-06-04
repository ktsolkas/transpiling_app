import "./resizable.component.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

const Resizable: React.FC<ResizableBoxProps> = (
  //   axis,
  //   children,
  //   height,
  //   width,
  //   resizeHandles,
  //   maxConstraints,
  //   minConstraints
  props
) => {
  return (
    // <ResizableBox
    //   height={height}
    //   width={width}
    //   axis={axis}
    //   resizeHandles={resizeHandles}
    //   maxConstraints={maxConstraints}
    //   minConstraints={minConstraints}
    // >
    <ResizableBox {...props}>{props.children}</ResizableBox>
  );
};

export default Resizable;
