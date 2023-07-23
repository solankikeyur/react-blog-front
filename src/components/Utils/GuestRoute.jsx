import PropTypes from "prop-types";
import userStore from "../../stores/UserStore";
import { Navigate } from "react-router-dom";

const GuestRoute = ({children}) => {
    const {authToken} = userStore();
    if(authToken) {
        return <Navigate to="/" replace ></Navigate>
    }
    return children;
}

GuestRoute.propTypes = {
    children: PropTypes.any
}

export default GuestRoute
