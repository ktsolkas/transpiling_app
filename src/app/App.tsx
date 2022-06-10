import SectionList from "../components/SectionList";
import { insertSectionAfter } from "../features/sections/sectionsSlice";
import { useAppDispatch } from "./store";

const App = () => {
  const dispatch = useAppDispatch();
  dispatch(insertSectionAfter({ id: null, type: "code" }));
  dispatch(insertSectionAfter({ id: null, type: "text" }));
  return (
    <div>
      <SectionList />
    </div>
  );
};

export default App;
