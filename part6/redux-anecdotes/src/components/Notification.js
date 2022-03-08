//import { useSelector } from "react-redux";
import { connect } from "react-redux";
const Notification = ({ notification }) => {
  //const notification = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notification) return null;
  return <div style={style}>{notification}</div>;
};

//export default Notification;

const mapStateToProps = (state) => ({
  notification: state.notifications,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
