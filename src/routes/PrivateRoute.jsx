import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../component/LoadingSpinner/LoadingSpinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <LoadingSpinner 
                size="large" 
                text="Authenticating..." 
                variant="newspaper"
                fullScreen={true}
            />
        );
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;