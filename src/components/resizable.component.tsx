import "./resizable.component.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

const Resizable: React.FC<ResizableBoxProps> = (
  props
) => {
  return (
    <ResizableBox {...props}>{props.children}</ResizableBox>
  );
};

export default Resizable;
