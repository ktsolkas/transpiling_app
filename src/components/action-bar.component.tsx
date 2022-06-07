import "./action-bar.component.css";
import { useDispatch } from "react-redux";
import { deleteSection, moveSection } from "../features/sections/sectionsSlice";

interface ActionBarProps {
  id: string;
}

//REFACTOR BUTTONS INTO SEPARATE ACTIONBUTTON COMPONENTS

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => dispatch(moveSection({ id, direction: "up" }))}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => dispatch(moveSection({ id, direction: "down" }))}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => dispatch(deleteSection(id))}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
