import "../index.css";
import PropTypes from "prop-types";

const Notification = ({ message, style }) => {
    return <div className={message ? style : ""}>{message}</div>;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
};

export default Notification;
