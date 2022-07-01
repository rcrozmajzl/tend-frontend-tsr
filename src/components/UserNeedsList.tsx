import React from 'react'
import { useFetchUserNeedsQuery } from '../services/authApi';
import { FaSun, FaLeaf, FaCloudRain, FaHandsHelping } from 'react-icons/fa';

function UserNeedsList() {
    const {data: fetchUserNeedsData, error: fetchUserNeedsError, isLoading: isFetchUserNeedsLoading, isFetching: isFetchUserNeedsFetching, isSuccess: isFetchUserNeedsSuccess} = useFetchUserNeedsQuery(); 


    return (
        <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Category
                                </th>
                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Need
                                </th>
                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Details
                                </th>
                                <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                {isFetchUserNeedsSuccess && (
                    <div>
                    {fetchUserNeedsData!.map(userNeed =>{
                        switch(userNeed.need.category) {
                            case 'Energy & Synergy':
                                return <div className='need' key={userNeed.id}>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="block relative">
                                                            <FaSun className="mx-auto object-cover rounded-full h-10 w-10 text-theme-warm-yellow"/>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {userNeed.need.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {userNeed.need.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {userNeed.need.details_general}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {userNeed.details_personal}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button>
                                                    <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                </button>
                                            </td>
                                        </tr>
                                    </div>

                            case 'Communication & Boundaries':
                                return <div className='need' key={userNeed.id}>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="block relative">
                                                        <FaCloudRain className="mx-auto p-1 object-cover h-10 w-10 text-theme-med-light-blue"/>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {userNeed.need.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.need.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.need.details_general}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.details_personal}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button>
                                                    <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                </button>
                                            </td>
                                        </tr>
                                    </div>

                            case 'Support Needs & Strengths':
                                return <div className='need' key={userNeed.id}>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="block relative">
                                                            <FaHandsHelping className="mx-auto object-cover rounded-full h-10 w-10 text-theme-med-light-purple"/>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        {userNeed.need.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.need.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.need.details_general}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                {userNeed.details_personal}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button>
                                                    <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                </button>
                                            </td>
                                        </tr>
                                    </div>

                            default:
                                return <p></p>
                        }
                        
                    }
                    )
                    }
                    </div>
                )}
            </tbody>
            </table>
        </div>
        </div>
        </div>

)
}

export default UserNeedsList