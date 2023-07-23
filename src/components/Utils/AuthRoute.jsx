import PropTypes from "prop-types";
import userStore from "../../stores/UserStore";
import { Navigate } from "react-router-dom";

const AuthRoute = ({children}) => {
    const {authToken, setAuthToken} = userStore();
    if(!authToken) {
        return <Navigate to="/login" replace ></Navigate>
    }
    if(!localStorage.getItem("access_token")) {
        setAuthToken('');
        return <Navigate to="/login" replace ></Navigate>
    }
    return children;
}

AuthRoute.propTypes = {
    children: PropTypes.any
}

export default AuthRoute
