import "./AddSection.css";
import { useAppDispatch } from "../app/store";
import { insertSectionAfter } from "../features/sections/sectionsSlice";
import AddSectionButton from "./AddSectionButton";
import { SectionTypes } from "../common/types/Section";

interface AddSectionProps {
  sectionBeforeId: string | null;
  overrideOpacity?: boolean;
}

const AddSection: React.FC<AddSectionProps> = ({
  sectionBeforeId,
  overrideOpacity,
}) => {
  const dispatch = useAppDispatch();
  const dispatchInsert = (type: SectionTypes) => () =>
    dispatch(insertSectionAfter({ id: sectionBeforeId, type }));

  return (
    <div className={`add-section ${overrideOpacity && "add-section-visible"}`}>
      <div className="add-buttons">
        <AddSectionButton onClick={dispatchInsert("code")}>
          Code
        </AddSectionButton>
        <AddSectionButton onClick={dispatchInsert("text")}>
          Text
        </AddSectionButton>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddSection;
