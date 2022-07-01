import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import LoadingToRedirect from './LoadingToRedirect';
import LoadingToAccess from './LoadingtoAccess'

const PrivateRoute = ({ children }: { children: any }) => {
    const {token} = useSelector(selectAuth);
    
    return token ? children : <LoadingToRedirect />;
    // return token ? <LoadingToAccess /> : <LoadingToRedirect />;
};

export default PrivateRoute;