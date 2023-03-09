
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';


const PublicRoute = ({ component }) => {

    const {isAuth} = useAuth();
  
    if (isAuth) {
        return <Navigate to="/account" replace />;
    }

    return component ? component : <Outlet />;
};

export default PublicRoute;