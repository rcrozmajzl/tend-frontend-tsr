import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const UserCard = () => {
    return (
        <div>
            <div className="max-w-sm bg-white rounded-lg border border-theme-med-grey shadow-md">
                <div className="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" className="hidden sm:inline-block text-navlink-green hover:bg-gray-100 focus:outline-none focus:ring-4  focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
                        <FaEllipsisV className="w-6 h-6" />
                    </button>

                    {/* Dropdown menu */}

                    <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-theme-light-grey shadow">
                        <ul className="py-1" aria-labelledby="dropdownButton">
                        <li>
                            <Link to="#" className="block py-2 px-4 text-sm text-theme-xx-dark-grey hover:bg-theme-light-grey">Edit</Link>
                        </li>
                        <li>
                            <Link to="#" className="block py-2 px-4 text-sm text-theme-xx-dark-grey hover:bg-theme-light-grey">Export Data</Link>
                        </li>
                        <li>
                            <Link to="#" className="block py-2 px-4 text-sm text-theme-xx-dark-grey hover:bg-theme-light-grey">Delete</Link>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={userData.avatar} alt="Avatar"/>
                    <h5 className="mb-1 text-xl font-medium text-navlink-green">{userData.username}</h5>
                    <span className="text-sm text-theme-dark-grey">{userData.location}</span>
                    <div className="flex mt-4 space-x-3 lg:mt-6">
                        <Link to="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-navbar-green rounded-lg hover:bg-navlink-green focus:ring-4 focus:outline-none focus:ring-navbar-green">Add friend</Link>
                        <Link to="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-theme-xx-dark-grey bg-white rounded-lg border border-theme-dark-grey hover:bg-theme-med-grey focus:ring-4 focus:outline-none focus:ring-theme-dark-grey">Message</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserCard
