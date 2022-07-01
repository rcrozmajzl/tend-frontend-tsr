import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectAuth } from '../features/authSlice';
import { useAppDispatch } from "../app/hooks";
import { FaCog, FaMapMarkerAlt, FaBirthdayCake, FaEnvelope } from "react-icons/fa"; 
import UserNeedsList from "../components/UserNeedsList";
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

function Profile() {
    const currentUserData = useSelector(selectAuth);
    const { username, email, birthdate, location, avatar } = currentUserData;

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
        <>
            <div className="flex">
                <div className='flex-1'>
                    <div className="w-80 h-full shadow-md bg-white absolute" id="sideNav">
                        <div className="pt-4 pb-2 px-6">
                            
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img src={!!avatar ? tendAvatar(avatar) : Avatar9} className="rounded-full w-10" alt="Avatar"/>
                                </div>
                                <div className="grow ml-3">
                                <p className="text-2xl font-bold text-navlink-green">{username}</p>
                                </div>
                            </div>
                            
                        </div>
                        <ul className="relative px-1">
                            <li className="relative">
                                <p className="flex items-center text-lg font-bold py-4 px-6 h-12 overflow-hidden text-navlink-green text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-navbar-green hover:opacity-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <FaMapMarkerAlt className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                    <span>{location}</span>
                                </p>
                            </li>
                            <li className="relative">
                                <p className="flex items-center text-lg font-bold py-4 px-6 h-12 overflow-hidden text-navlink-green text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-navbar-green hover:opacity-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <FaBirthdayCake className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                    <span>{birthdate}</span>
                                </p>
                            </li>
                            <li className="relative">
                                <p className="flex items-center text-lg font-bold py-4 px-6 h-12 overflow-hidden text-navlink-green text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-navbar-green hover:opacity-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <FaEnvelope className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                    <span>{email}</span>
                                </p>
                            </li>
                            <li className="relative">
                                <p className="flex items-center text-lg font-bold py-4 px-6 h-12 overflow-hidden text-navlink-green text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-navbar-green hover:opacity-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <FaMapMarkerAlt className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                    <span>{location}</span>
                                </p>
                            </li>
                        </ul>

                        <div className="text-center bottom-0 absolute w-full">
                            <hr className="m-0"/>
                            <p className="py-2 text-sm text-gray-700">tailwind-elements.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <UserNeedsList/>
                </div>
            </div>
        </>

        // <section classNameName="vh-100">
        //     <div classNameName="container py-4 h-100">
        //         <div classNameName="row d-flex justify-content-center align-items-center h-100">
        //             <div classNameName="col-12 col-md-8 col-lg-6 col-xl-5">
        //                 <div
        //                     classNameName="card bg-dark text-white"
        //                     style={{ borderRadius: "1rem" }}
        //                 >
        //                     <div classNameName="card-body p-4 text-center">
        //                         <div classNameName="mb-md-5 mt-md-4 pb-5">
        //                             <h2 classNameName="fw-bold mb-2">Welcome to Profile</h2>
        //                             <h4>Username: {username}</h4>
        //                             <button 
        //                                 classNameName="btn btn-outline-light btn-lg px-5 mt-3" 
        //                                 type="button"
        //                                 onClick={() => handleLogout()}
        //                             >
        //                                 Logout
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default Profile;