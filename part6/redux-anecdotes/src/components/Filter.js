import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../reduxSlices/filterSlice";

export default function Filter() {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    dispatch(changeFilter(target.value));
  };
  return (
    <div>
      filter
      <input value={filter} name="filter" onChange={handleChange} />{" "}
    </div>
  );
}
