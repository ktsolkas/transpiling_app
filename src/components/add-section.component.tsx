import "./add-section.component.css";
import { useAppDispatch } from "../app/store";
import { insertSectionAfter } from "../features/sections/sectionsSlice";

interface AddSectionProps {
  sectionBeforeId: string | null;
  overrideOpacity?: boolean;
}

const AddSection: React.FC<AddSectionProps> = ({
  sectionBeforeId,
  overrideOpacity,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`add-section ${overrideOpacity && "add-section-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertSectionAfter({ id: sectionBeforeId, type: "code" }))
          }
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() =>
            dispatch(insertSectionAfter({ id: sectionBeforeId, type: "text" }))
          }
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddSection;
