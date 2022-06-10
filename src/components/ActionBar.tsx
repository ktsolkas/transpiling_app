import "./ActionBar.css";
import { deleteSection, moveSection } from "../features/sections/sectionsSlice";
import { useAppDispatch } from "../app/store";
import ActionButton from "./ActionButton";
import { Direction } from "../common/types/Direction";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const dispatchMove = (direction: Direction) => () =>
    dispatch(moveSection({ id, direction }));

  return (
    <div className="action-bar">
      <ActionButton className="fas fa-arrow-up" onClick={dispatchMove("up")} />
      <ActionButton
        className="fas fa-arrow-down"
        onClick={dispatchMove("down")}
      />
      <ActionButton
        className="fas fa-times"
        onClick={() => dispatch(deleteSection(id))}
      />
    </div>
  );
};

export default ActionBar;
