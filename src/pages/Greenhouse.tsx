import { useFetchUsersQuery } from '../services/authApi';
import { Link } from 'react-router-dom';
import Avatar1 from "../assets/avatars/1.png";
import Avatar2 from "../assets/avatars/2.png";
import Avatar3 from "../assets/avatars/3.png";
import Avatar4 from "../assets/avatars/4.png";
import Avatar5 from "../assets/avatars/5.png";
import Avatar6 from "../assets/avatars/6.png";
import Avatar7 from "../assets/avatars/7.png";
import Avatar8 from "../assets/avatars/8.png";
import Avatar9 from "../assets/avatars/9.png";
import Avatar10 from "../assets/avatars/10.png";
// import { FaEllipsisV } from 'react-icons/fa';


const Greenhouse = () => {
    
    const { data: fetchUsersData, error: fetchUsersError, isLoading: isFetchUsersLoading, isFetching: isFetchUsersFetching, isSuccess: isFetchUsersSuccess } = useFetchUsersQuery();

    const tendAvatar = (avatar: string) => {
        switch(avatar) {
            case '1':
                return Avatar1 
            case '2':
                return Avatar2 
            case '3':
                return Avatar3 
            case '4':
                return Avatar4 
            case '5':
                return Avatar5 
            case '6':
                return Avatar6 
            case '7':
                return Avatar7 
            case '8':
                return Avatar8 
            case '9':
                return Avatar9 
            case '10':
                return Avatar10
            default:
                return Avatar9
        }
    }

    return (
        <div className="overscroll-contain">
            <section className="my-10 text-gray-700 overscroll-auto">
                <div className="text-center md:max-w-xl lg:max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">Greenhouse</h3>
                    <p className="mb-6 pb-2 md:mb-12 md:pb-0 text-lg">
                    Welcome to the Greenhouse! Here you can peruse the user pool and initiate connections. Once a friend request has been accepted by both users, you will be able to see each other in your personal friend gardens. Upcoming functionality will allow you to filter users by a variety of parameters including distance, age, shared needs, and more!
                    </p>
                </div>
            </section>
            <div className='md:container md:mx-auto shadow-greenhouse bg-theme-light-grey rounded-lg py-10 px-3 overscroll-auto'>
                {isFetchUsersLoading && <h2>...Loading</h2>}
                {isFetchUsersFetching && <h2>...Fetching</h2>}
                {fetchUsersError && <h2>Something went wrong</h2>}
                {isFetchUsersSuccess && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
                        {fetchUsersData!.map(user =>{
                            return <div className='user' key={user.id}>
                                <div className="p-4 flex items-center justify-center">
                                <div className="flex-col  flex justify-center items-center">
                                    <div className="flex-shrink-0">
                                        <div className="block relative">
                                            <img alt="avatar" src={!!user.avatar ? tendAvatar(user.avatar) : Avatar9} className="mx-auto object-cover rounded-full h-36 w-36 p-1 bg-white shadow-lg"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center flex flex-col">
                                        <span className="text-gray-600 text-xl font-bold">
                                            {user.username}
                                        </span>
                                        <span className="text-gray-500 text-lg py-1">
                                            {user.location}
                                        </span>
                                        <Link to="#" className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium text-center text-theme-dark-green hover:text-white bg-navbar-green rounded-lg hover:bg-navlink-green focus:ring-4 focus:outline-none focus:ring-navbar-green shadow-md w-24">add friend</Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        })}
                            
                        
                    </div>
                    )
                }
            </div>
        </div>
    )
};

export default Greenhouse;