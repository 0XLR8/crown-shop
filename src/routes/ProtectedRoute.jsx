import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
    const {auth, authPending} = useSelector((state) => state.auth)

    if(authPending){
        return <Loader />
    }

    if(auth){
        return <Outlet />
    }

    return <Navigate to='auth' />
}
