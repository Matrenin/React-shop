
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const PrivateRoute = ({ component }) => {
  
    const {isAuth} = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return component ? component : <Outlet />;
};

export default PrivateRoute;
