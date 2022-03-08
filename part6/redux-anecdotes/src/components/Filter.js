//import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { changeFilter } from "../reduxSlices/filterSlice";

function Filter(props) {
  //const filter = useSelector((state) => state.filter);
  //const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = ({ target }) => {
    //dispatch(changeFilter(target.value));
    props.changeFilter(target.value);
  };
  return (
    <div style={style}>
      filter
      <input value={props.filter} name="filter" onChange={handleChange} />{" "}
    </div>
  );
}

const mapStateToProps = (state) => ({ filter: state.filter });
const mapDispatchToProps = { changeFilter };

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
