import { useState } from 'react'
// import { Fragment } from 'react';
// import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Disclosure, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { FaDoorClosed, FaSeedling, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Log Out Successful");
        navigate("/auth")
    }


    return (
        <Disclosure as="nav" className="bg-navbar-green">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-32">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button 
                                    className="shadow-lg inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                    onClick={() => setNavOpen(!navOpen)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <FaTimes className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                        <FaBars className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start h-full">
                                <div className="flex-shrink-0 flex items-center h-full py-3">
                                    <img
                                        className="block lg:hidden shadow-lg rounded-full h-full w-auto border-none"
                                        src={require("../assets/logos/tend-Logo-pop-crop.gif")}
                                        alt="tend"
                                    />
                                    <img
                                        className="hidden lg:block shadow-lg rounded-full h-full w-auto border-none"
                                        src={require("../assets/logos/tend-Logo-pop-crop.gif")}
                                        alt="tend"
                                    />
                                </div>
                                <div className="flex items-center ml-5">
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-6">
                                            <NavLink
                                                to='/profile'
                                                className={({ isActive }) => (isActive ? 'whitespace-nowrap bg-navlink-green text-white px-3 py-2 rounded-md text-2xl font-bold' : 'whitespace-nowrap text-navlink-green hover:bg-navlink-green hover:opacity-50 hover:text-white bg-white px-3 py-2 rounded-md text-2xl font-bold')}
                                            >
                                                profile
                                            </NavLink>

                                            <NavLink
                                                to='/greenhouse'
                                                className={({ isActive }) => (isActive ? 'whitespace-nowrap bg-navlink-green text-white px-3 py-2 rounded-md text-2xl font-bold' : 'whitespace-nowrap text-navlink-green hover:bg-navlink-green hover:opacity-50 hover:text-white bg-white px-3 py-2 rounded-md text-2xl font-bold')}
                                            >
                                                greenhouse
                                            </NavLink>

                                            <NavLink
                                                to='/garden'
                                                className={({ isActive }) => (isActive ? 'whitespace-nowrap bg-navlink-green text-white px-3 py-2 rounded-md text-2xl font-bold' : 'whitespace-nowrap text-navlink-green hover:bg-navlink-green hover:opacity-50 hover:text-white bg-white px-3 py-2 rounded-md text-2xl font-bold')}
                                            >
                                                my garden
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="shadow-lg bg-navlink-green p-1 rounded-full text-theme-med-grey hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navlink-green focus:ring-white"
                                >
                                    <span className="sr-only">view notifications</span>
                                    <FaSeedling className="h-10 w-10 p-1" aria-hidden="true" />
                                </button>
                                <div className="hidden sm:block sm:ml-6">
                                    <button 
                                        type="button" 
                                        className="shadow-lg bg-navlink-green p-1 rounded-full text-theme-med-grey hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navlink-green focus:ring-white"
                                        onClick={() => handleLogout()}
                                    >
                                        <span className="sr-only">sign out</span>
                                        <FaDoorClosed className="h-10 w-10 p-1" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition
                        enter="transition ease-out duration-100 transform"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75 transform"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        
                        {(ref) => (
                            <div className="md:hidden" id="mobile-menu">
                                <div ref={ref} className="pt-2 pb-3 space-y-1 sm:px-3">
                                    <Disclosure.Panel className="sm:hidden">
                                        <Disclosure.Button className="w-full text-left">
                                            <NavLink 
                                                to='/profile'
                                                className={({ isActive }) => (isActive ? "bg-navlink-green text-white block px-3 py-2 text-2xl font-bold" : "hover:bg-navlink-green hover:opacity-50 hover:text-white text-navlink-green block px-3 py-2 text-2xl font-bold")}
                                            >
                                                profile
                                            </NavLink>

                                            <NavLink 
                                                to='/greenhouse'
                                                className={({ isActive }) => (isActive ? "bg-navlink-green text-white block px-3 py-2 text-2xl font-bold" : "hover:bg-navlink-green hover:opacity-50 hover:text-white text-navlink-green block px-3 py-2 text-2xl font-bold")}
                                            >
                                                greenhouse
                                            </NavLink>

                                            <NavLink 
                                                to='/mygarden'
                                                className={({ isActive }) => (isActive ? "bg-navlink-green text-white block px-3 py-2 text-2xl font-bold" : "hover:bg-navlink-green hover:opacity-50 hover:text-white text-navlink-green block px-3 py-2 text-2xl font-bold")}
                                            >
                                                my garden
                                            </NavLink>

                                            <button
                                                type="button"
                                                className="shadow-lg hover:bg-navlink-green hover:opacity-50 hover:text-white bg-white text-navlink-green block px-3 py-2 rounded-md text-2xl font-bold m-2"
                                                onClick={() => handleLogout()}
                                            >
                                                <span className="sr-only">sign out</span>
                                                sign out
                                            </button>
                                        </Disclosure.Button>
                                    </Disclosure.Panel>
                                </div>
                            </div> 
                        )}       
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

export default Header;





