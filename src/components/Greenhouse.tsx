import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useFetchOtherUsersQuery } from '../services/authApi';
import { selectOtherUsers, setOtherUsers } from '../features/userSlice';
import UserCard from './UserCard';


const Greenhouse = () => {
    const dispatch = useAppDispatch();

    const otherUsers = useAppSelector(selectOtherUsers);

    const [fetchOtherUsers, {data: fetchOtherUsersData, isSuccess: isFetchOtherUsersSuccess, isError: isFetchOtherUsersError, error: fetchOtherUsersError}] = useFetchOtherUsersQuery();

    useEffect(() => {
        if(isFetchOtherUsersSuccess) {
            console.log(fetchOtherUsersData)
            dispatch(setOtherUsers({username: registerData.user.username, email: registerData.user.email, birthdate: registerData.user.birthdate, location: registerData.user.location, avatar: registerData.user.avatar, token: registerData.jwt))
    }, [dispatch]);

    return (
        <>
            <div>
                <h1>Welcome to the Greenhouse</h1>
                <p>You should only be able to see this page if you are logged in</p>
                <p>Eventually it will have a user pool where we can make friends</p>
            </div>
        </>
    )
};

export default Greenhouse;