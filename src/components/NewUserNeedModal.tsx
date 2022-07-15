import { useState } from 'react';
import { FaCloudRain, FaHandsHelping, FaRegTimesCircle, FaStar, FaSun } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNewUserNeedMutation } from '../services/authApi';



const NewUserNeedModal = (setModalOn: any, setChoice: any ) => {
    const localNeedStarterData = (JSON.parse(localStorage.getItem("draftUserNeed")!));
    const currentUser = (JSON.parse(localStorage.getItem("user")!));
    
    // Capture need info  
    const [needStarterData, setNeedStarterData] = useState(localNeedStarterData);

    // Capture form input
    const [formDetailsValue, setFormDetailsValue] = useState("");
    const [formFrequencyValue, setFormFrequencyValue] = useState(0);
    const [formFrequencyHover, setFormFrequencyHover] = useState(0);
    const [formImportanceValue, setFormImportanceValue] = useState(0);
    const [formImportanceHover, setFormImportanceHover] = useState(0);


    const [addNewUserNeed, {data: newUserNeedData, isSuccess: isNewUserNeedSuccess, isError: isNewUserNeedError, error: newUserNeedError}] = useNewUserNeedMutation();

    
    const categoryIcon = () => {
        switch(localNeedStarterData.category) {
            case 'Energy & Synergy':
                return <div className="flex-shrink-0">
                <div className="block relative">
                    <FaSun className="mx-auto bg-theme-x-dark-grey object-cover rounded-full h-full w-full p-2 text-theme-warm-yellow"/>
                </div>
            </div>

            case 'Communication & Boundaries':
                return <div className="flex-shrink-0">
                <div className="block relative">
                <FaCloudRain className="mx-auto bg-theme-med-grey p-4 object-cover h-full w-full text-theme-med-light-blue"/>
                </div>
            </div>

            case 'Support Needs & Strength':
                return <div className="flex-shrink-0">
                <div className="block relative">
                <FaHandsHelping className="mx-auto bg-theme-med-grey object-cover rounded-full h-full w-full p-3 text-theme-med-light-purple"/>
                </div>
            </div>
        }
    }

    const handleDetailsChange = (e: any) => {
        setFormDetailsValue(e.target.value)
    };

    const handleFrequencyChange = (e: any) => {
        setFormFrequencyValue(e.target.value)
    };

    const handleImportanceChange = (e: any) => {
        setFormImportanceValue(e.target.value)
    };

    const handleNewUserNeed = async() => {
        const newUserNeedData = [ formDetailsValue, formImportanceValue, formFrequencyValue, currentUser.id, localNeedStarterData.id ]
        if(newUserNeedData) {
            await addNewUserNeed({ details_personal: formDetailsValue, rating_importance: formImportanceValue, rating_frequency: formFrequencyValue, user_id: currentUser.id, need_id: localNeedStarterData.id });
        } else {
            toast.error("Please fill out all Input fields")
        }
    };


    const handleSubmit = () => {
        setChoice(true)
        setModalOn(false)
    }

    const handleCancel = () => {
        setChoice(false)
        setModalOn(false)
    }

    return (
        <div>
            <div className="bg-zinc-200 bg-opacity-80 bg-fixed inset-0 z-50">
                <div className="flex h-screen justify-center items-center">
                    <div className="flex-col justify-center bg-white py-12 border-4 border-navbar-green rounded-xl">
                        <div className="relative object-contain max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="user-need-box max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                                <div className="bg-theme-dark-green px-6 py-8 lg:flex-shrink-1 lg:p-12">
                                    <h3 className="text-2xl leading-8 font-extrabold text-white sm:text-3xl sm:leading-9 ">
                                    Add New Need
                                    </h3>
                                    <p className="mt-6 text-xl leading-6 text-theme-light-grey">
                                    Before adding this need to your personal list, take a moment to clarify what this looks like for you. Type details and preferences in the personal details section. Use the frequency rating section to indicate how often this need may require maintenance.  Use the importance rating section to indicate how vital have this need met is to your wellbeing. 
                                    </p>

                                    <form>
                                        <div className="w-4/5 px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg">
                                            <div className="mb-8">
                                                <div className="flex justify-center -mt-16 md:justify-end">
                                                    <div className="object-cover w-20 h-20 border-2 border-navbar-green rounded-full">
                                                        <span className='mx-auto object-cover'>{categoryIcon()}</span>
                                                    </div> 
                                                </div>
                                                <h2 className="mt-2 text-2xl font-semibold text-gray-800 md:mt-0 md:text-3xl">{localNeedStarterData.title}</h2>
                                            </div>
                                    
                                            <div className='relative z-0 mb-6 w-full group'>
                                                <div className="mb-8">
                                                    <p className="block mb-2 text-lg font-medium leading-5 text-gray-700">
                                                    <strong>GENERAL DESCRIPTION</strong>
                                                    </p>
                                                    <p className="block mb-2 text-lg font-medium leading-5 text-gray-700">
                                                    {localNeedStarterData.details_general}
                                                    </p>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4 bg-theme-light-grey p-4 rounded-lg'>
                                                    <div className='col-span-2'>
                                                        <div className='mb-8 pr-8'>
                                                            <label className="block mb-2 text-lg font-medium leading-5 text-gray-700">
                                                                <strong>PERSONAL DETAILS</strong>
                                                                <textarea className="block mb-2 mt-2 font-medium appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-theme-warm-yellow focus:border-transparent" id="details_personal" placeholder="Enter personal details..." name="details_personal" rows={5} cols={40}>
                                                                </textarea>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-1'>
                                                        <div className='ml-1 border border-gray-300 bg-white p-4 rounded-lg'>
                                                            <div className='mb-4'>
                                                                <label className="block mb-2 text-lg font-medium leading-5 text-gray-700">
                                                                    <strong>FREQUENCY RATING</strong>
                                                                    <div className='rating_frequency'>
                                                                        {[...Array(3)].map((clock, frequency_index) => {
                                                                            frequency_index += 1;
                                                                            return (
                                                                                <button 
                                                                                    type='button' 
                                                                                    key={frequency_index} 
                                                                                    className={frequency_index <= (formFrequencyHover || formFrequencyValue) ? ("text-theme-warm-yellow pr-2 mt-4 text-2xl") : ("text-theme-med-grey pr-2 mt-4 text-2xl")} 
                                                                                    onClick={() => setFormFrequencyValue(frequency_index)}
                                                                                    onMouseEnter={() => setFormFrequencyHover(frequency_index)} onMouseLeave={() => setFormFrequencyHover(formFrequencyValue)}
                                                                                >
                                                                                    <span>
                                                                                        <FaStar/>
                                                                                    </span>
                                                                                </button>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            <div className='mb-3'>
                                                                <label className="block mb-2 text-lg font-medium leading-5 text-gray-700">
                                                                    <strong>IMPORTANCE RATING</strong>
                                                                    <div className='rating_importance'>
                                                                        {[...Array(3)].map((ge, importance_index) => {
                                                                            importance_index += 1;
                                                                            return (
                                                                                <button 
                                                                                    type='button' 
                                                                                    key={importance_index} 
                                                                                    className={importance_index <= (formImportanceHover || formImportanceValue) ? ("text-theme-warm-yellow pr-2 mt-4 text-2xl") : ("text-theme-med-grey pr-2 mt-4 text-2xl")} 
                                                                                    onClick={() => setFormImportanceValue(importance_index)}
                                                                                    onMouseEnter={() => setFormImportanceHover(importance_index)} onMouseLeave={() => setFormImportanceHover(formImportanceValue)}
                                                                                >
                                                                                    <span className='importance_rating'>
                                                                                    <FaStar/>
                                                                                    </span>
                                                                                </button>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex justify-start mt-2">
                                                        <div className="rounded-full shadow">
                                                            <button type="button" className="p-2 text-theme-dark-grey hover:text-theme-dark-green focus:ring-navbar-green focus:ring-offset-theme-med-grey w-max-content transition ease-in duration-200 text-center text-2xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full ">
                                                            <FaRegTimesCircle className=""/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <div className="rounded-md shadow">
                                                        <button type="button" className="py-2 px-4  bg-navlink-green hover:bg-theme-dark-green focus:ring-navbar-green focus:ring-offset-theme-med-grey text-white w-max-content transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                                        save need
                                                        </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUserNeedModal;