import { useSelector } from 'react-redux';
import { selectAuth } from '../features/authSlice';
import LoadingToRedirect from './LoadingToRedirect';
import LoadingToAccess from './LoadingtoAccess'

const PrivateRoute = ({ children }: { children: any }) => {
    const {jwt} = useSelector(selectAuth);
    
    return jwt ? children : <LoadingToRedirect />;
    // return jwt ? <LoadingToAccess /> : <LoadingToRedirect />;
};

export default PrivateRoute;