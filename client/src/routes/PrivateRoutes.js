import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "~/config";

function PrivateRoutes(props) {
    const { isLoggedIn } = useSelector(state => state.user);
    return isLoggedIn ? props.children : <Navigate to={config.routes.login} />;

}

export default PrivateRoutes;