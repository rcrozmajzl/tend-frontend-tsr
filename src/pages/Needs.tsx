import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFetchNeedsQuery } from '../services/authApi';
import { useAppSelector } from '../app/hooks';
import { selectNeeds } from '../features/needsSlice';
import NewUserNeedModal from '../components/NewUserNeedModal';
import { FaSeedling, FaSun, FaLeaf, FaCloudRain, FaHandsHelping } from 'react-icons/fa';


function Needs() {
    const [newUserNeed, setNewUserNeed] = useState("")
    const [modalOn, setModalOn] = useState(false)
    const [choice, setChoice] = useState(false)


    const needsState = useAppSelector(selectNeeds)
    const {data: fetchNeedsData, error: fetchNeedsError, isLoading: isFetchNeedsLoading, isFetching: isFetchNeedsFetching, isSuccess: isFetchNeedsSuccess} = useFetchNeedsQuery();

    const draftUserNeed = JSON.parse(localStorage.getItem("draftUserNeed") || "{}");


    useEffect(() => {
        setNewUserNeed((localStorage.getItem('draftUserNeed')!));
    }, []);
    
    useEffect(() => {
        newUserNeed! && newUserNeed.length > 0 ? window.localStorage.setItem('draftUserNeed', newUserNeed!) : console.log("no draft user needs in state");
    }, []);

    useEffect(() => {
        if(isFetchNeedsSuccess) {

        }
    })
    const needDataToLS = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const needsList = [...needsState]
        const needId = (event.currentTarget.id)
        const selectNeed = needsList.filter(need => `${need.id}` === `${needId}`);

        localStorage.setItem(
            "draftUserNeed",
            JSON.stringify({
                id: selectNeed[0].id,
                category: selectNeed[0].category,
                title: selectNeed[0].title,
                details_general: selectNeed[0].details_general,
            })
        )
        setModalOn(true)
    }


    return (
        <>
            <div className='flex justify-center'>
                <section className="my-10 text-gray-700">
                    <div className="text-center md:max-w-xl lg:max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold mb-6 text-gray-800">Needs</h3>
                        <p className="mb-6 pb-2 md:mb-12 md:pb-0 text-lg">
                        Welcome to the needs hub! Here you can browse need templates and save needs that resonate with you. Needs are divided into three categories: Energy & Synergy, Communication & Boundaries, and Support Needs & Strengths. Read more about each category below.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-center px-3 mb-20">
                        <div>
                            <div className="block rounded-lg shadow-lg bg-white">
                                <div className="overflow-hidden rounded-t-lg h-28 bg-navlink-green"></div>
                                    <div className="w-24 -mt-12 border border-white rounded-full mx-auto bg-white">
                                    <FaSun className="fa-solid fa-sun text-[5rem] mx-auto p-1 text-theme-warm-yellow" />
                                    </div>
                                <div className="p-6">
                                    <h4 className="text-2xl font-semibold mb-4">Energy & Synergy</h4>
                                    <hr />
                                    <p className="mt-4">
                                    <FaSeedling className="w-6 pr-2 inline-block text-navlink-green opacity-60" aria-hidden="true" focusable="false" />
                                    Energy needs are things that bring or cost you joy, energy, and fulfillment as an individual.  This consders things like introversion and extroversion, social stamina and HSP traits, coping skills and stims, hobbies and special interests, humor styles and entertainment preferences, values and priorities, intrinsic and extrinsic motivation, spirituality and religion, and more. Synergy needs are things that bring or cost joy, energy, and fulfillment in your interpersonal relationships. This looks like mutual goals and values, shared interests and activities, accountability and encouragement, and more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    <div>

                    <div className="block rounded-lg shadow-lg bg-white">
                        <div className="overflow-hidden rounded-t-lg h-28 bg-navbar-green"></div>
                            <div className="w-24 -mt-12 overflow-hidden border border-white rounded-full mx-auto bg-white">
                            <FaCloudRain className="fa-solid fa-sun text-[5rem] mx-auto p-1 text-theme-med-light-blue"/>
                            </div>
                            <div className="p-6">
                                <h4 className="text-2xl font-semibold mb-4">Communication & Boundaries</h4>
                                <hr />
                                <p className="mt-4">
                                <FaSeedling className="w-6 pr-2 inline-block text-navlink-green opacity-60" aria-hidden="true" focusable="false" />
                                Communication needs refer to your personal preferences and tendencies when interacting with others. This includes things like eye contact and facial expressions, tone and body language, processing time and directness, ask culture and guess culture, preference for written communication over speaking, AAC, socal media preferences and more.  Boundaries are guidelines surrounding how others may safely and healthily interact with you. This covers things like time limits and topic limits, conflict management and apologies, availability and reachability, independence and autonomy, privacy and trust, and more.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="block rounded-lg shadow-lg bg-white">
                            <div className="overflow-hidden rounded-t-lg h-28 bg-navlink-green"></div>
                                <div className="w-24 -mt-12 overflow-hidden border border-white rounded-full mx-auto bg-white">
                                <FaHandsHelping className="fa-solid fa-sun text-[5rem] mx-auto p-1 text-theme-med-light-purple"/>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-2xl font-semibold mb-4">Support Needs & Strengths</h4>
                                    <hr />
                                    <p className="mt-4">
                                    <FaSeedling className="w-6 pr-2 inline-block text-navlink-green opacity-60" aria-hidden="true" focusable="false" />
                                    Support needs are areas in which you may struggle or require specific accommodations. These can range from chemical and sensory sensitivities, to allergies and dietary restrictions, to mobility and energy considerations, to memory and executive functioning struggles, to triggers and emotional regulation, and beyond. Support strengths are any tasks with which you feel confident and competent enough to support someone else. This could be anything from housekeeping and yardwork, to grocery shopping and cooking, to budgeting and money management, to to phone calls and emails, to tutoring and childcare, and more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='w-5/6 mx-auto mb-10'/>
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                                <h2 className="text-2xl leading-tight">
                                needs
                                </h2>
                                <div className="text-end">
                                    <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                                        <div className=" relative ">
                                            <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-navlink-green focus:border-transparent" placeholder="category"/>
                                        </div>
                                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-navlink-green opacity-70 rounded-lg shadow-md hover:bg-theme-dark-green focus:outline-none focus:ring-2 focus:ring-navlink-green focus:ring-offset-2 focus:ring-offset-navbar-green" type="submit">
                                        filter
                                        </button>
                                    </form>
                                </div>
                            </div>
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
                                            {isFetchNeedsSuccess && (
                                                <>
                                                    {fetchNeedsData.map((need: any) =>{
                                                        switch(need.category) {
                                                            case 'Energy & Synergy':
                                                                return <tr className='need' key={need.id}>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0">
                                                                                    <div className="block relative">
                                                                                    <FaSun className="mx-auto object-cover rounded-full h-10 w-10 text-theme-warm-yellow"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ml-4">
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {need.category}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.title}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.details_general}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <button id={need.id} onClick={needDataToLS}>
                                                                            <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                                            </button>
                                                                        </td>
                                                                    </tr>

                                                            case 'Communication & Boundaries':
                                                                return <tr className='need' key={need.id}>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0">
                                                                                    <div className="block relative">
                                                                                    <FaCloudRain className="mx-auto p-1 object-cover h-10 w-10 text-theme-med-light-blue"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ml-4">
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {need.category}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.title}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.details_general}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <button id={need.id} onClick={needDataToLS}>
                                                                            <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                                            </button>
                                                                        </td>
                                                                    </tr>

                                                            case 'Support Needs & Strengths':
                                                                return <tr className='need' key={need.id}>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0">
                                                                                    <div className="block relative">
                                                                                    <FaHandsHelping className="mx-auto object-cover rounded-full h-10 w-10 text-theme-med-light-purple"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ml-4">
                                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                                    {need.category}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.title}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                            {need.details_general}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                            <button id={need.id} onClick={needDataToLS}>
                                                                            <FaLeaf className="mx-auto object-cover rounded-full h-5 w-5 text-theme-dark-grey hover:text-navlink-green"/>
                                                                            </button>
                                                                        </td>
                                                                    </tr>

                                                            default:
                                                                return <p></p>
                                                        }
                                                    })}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                                        <div className="flex items-center">
                                            <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-navbar-green">
                                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                                    </path>
                                                </svg>
                                            </button>
                                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-theme-dark-green bg-white hover:bg-navbar-green hover:bg-opacity-50">
                                            1
                                            </button>
                                            <button type="button" className="w-full px-4 py-2 border text-base text-theme-dark-green bg-white hover:bg-navbar-green hover:bg-opacity-50">
                                                2
                                            </button>
                                            <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-theme-dark-green bg-white hover:bg-navbar-green hover:bg-opacity-50">
                                                3
                                            </button>
                                            <button type="button" className="w-full px-4 py-2 border text-base text-theme-dark-green bg-white hover:bg-navbar-green hover:bg-opacity-50">
                                                4
                                            </button>
                                            <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-navlink-green bg-white hover:bg-navbar-green">
                                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>    
            {modalOn && <NewUserNeedModal setModalOn={setModalOn} setChoice={setChoice}/>}  
        </>
    );
}

export default Needs


/* {isFetchNeedsLoading && <h2>...Loading</h2>}
                {isFetchNeedsFetching && <h2>...Fetching</h2>}
                {fetchNeedsError && <h2>Something went wrong</h2>} */