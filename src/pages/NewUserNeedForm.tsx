import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaClock, FaCloudRain, FaGem, FaHandsHelping, FaLeaf, FaRegTimesCircle, FaStar, FaSun } from 'react-icons/fa';
import { useNewUserNeedMutation } from '../services/authApi';


const NewUserNeedForm = () => {
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

    useEffect(() => {
        if (isNewUserNeedSuccess) {
            toast.success("User Need Added Successfully");
            localStorage.removeItem("draftUserNeed");
            setNeedStarterData(null);
        }
    }, [isNewUserNeedSuccess])

    useEffect(() => {
        if (isNewUserNeedError) {
            toast.error((newUserNeedError as any).data.message);
        }
    }, [isNewUserNeedError])

    useEffect(() => {
        setNeedStarterData((localStorage.getItem('draftUserNeed')!));
    }, []);
    
    // useEffect(() => {
    //     needStarterData! && needStarterData.length > 0 ? window.localStorage.setItem('draftUserNeed', needStarterData!) : console.log("no draft user needs in state");
    // }, []);

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

    return ( 
        <div>
            {(needStarterData! !== undefined) ? (
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
                            

                            {/* <div className="mt-8">
                                <div className="flex items-center">
                                    <h4 className="flex-shrink-0 pr-4 bg-white text-lg leading-5 tracking-wider font-semibold uppercase text-navlink-green">
                                        {localNeedStarterData.title}
                                    </h4>
                                    <div className="flex-1 border-t-2 border-gray-200">
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='p-5'/>
                                    <div className="rounded-lg shadow-xl mx-auto my-1 pl-8">
                                        <form className="w-full grid grid-cols-3 gap-x-2 gap-y-2 mx-auto justify-around">
                                            <div className='lg:col-span-2 basis-2/3'>
                                                <div className="w-full inline-block mt-4">
                                                    <label className="text-gray-700 inline-block">
                                                    GENERAL DETAILS:
                                                        <p className="ml-3 text-lg leading-5 text-gray-700 inline-block">
                                                        {localNeedStarterData.details_general}
                                                        </p>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-gray-700">
                                                        PERSONAL DETAILS
                                                        <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="details_personal" placeholder="Enter personal details" name="details_personal" rows={5} cols={40}>
                                                        </textarea>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-gray-700">
                                                        FREQUENCY RATING
                                                        <div className='rating_frequency'>
                                                            {[...Array(3)].map((clock, frequency_index) => {
                                                                frequency_index += 1;
                                                                return (
                                                                    <button 
                                                                        type='button' 
                                                                        key={frequency_index} 
                                                                        className={frequency_index <= (formFrequencyHover || formFrequencyValue) ? ("text-theme-dark-green") : ("text-navbar-green")} 
                                                                        onClick={() => setFormFrequencyValue(frequency_index)}
                                                                        onMouseEnter={() => setFormFrequencyHover(frequency_index)} onMouseLeave={() => setFormFrequencyHover(formFrequencyValue)}
                                                                    >
                                                                        <span className='clock'>
                                                                            <FaClock/>
                                                                        </span>
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-gray-700">
                                                        IMPORTANCE RATING
                                                        <div className='rating_importance'>
                                                            {[...Array(3)].map((gem, importance_index) => {
                                                                importance_index += 1;
                                                                return (
                                                                    <button 
                                                                        type='button' 
                                                                        key={importance_index} 
                                                                        className={importance_index <= (formImportanceHover || formImportanceValue) ? ("text-theme-dark-green") : ("text-navbar-green")} 
                                                                        onClick={() => setFormImportanceValue(importance_index)}
                                                                        onMouseEnter={() => setFormImportanceHover(importance_index)} onMouseLeave={() => setFormImportanceHover(formImportanceValue)}
                                                                    >
                                                                        <span className='gem'>
                                                                            <FaGem/>
                                                                        </span>
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='basis-1/3'>
                                                <div className='m-10'>
                                                    <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                                                        <div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
                                                            <span>
                                                                {categoryIcon()}
                                                            </span>
                                                        </div>
                                                        <p className="mt-4 text-sm leading-5">
                                                            <span className="block font-medium text-gray-500 dark:text-gray-400">
                                                                {localNeedStarterData.category}
                                                            </span>
                                                        </p>
                                                        <div className="mt-6">
                                                            <div className="rounded-md shadow">
                                                                <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                                    add new need
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
            ) : (
                <Navigate to="/needs" />
            )}
        </div>
    )
}

export default NewUserNeedForm;



// <div className="mt-8 lg:grid lg:grid-cols-3 lg:col-gap-8 lg:row-gap-5">
//                                     <ul className="mt-8 flex lg:col-span-2">
//                                         <li className="flex">
//                                             <p className="ml-3 text-lg leading-5 text-gray-700">
//                                                 GENERAL DETAILS: {localNeedStarterData.details_general}
//                                             </p>
//                                         </li>
//                                         <li className="flex">
//                                             <p className="ml-3 text-sm leading-5 text-gray-700">
//                                                 <label className="text-gray-700" htmlFor="name">
//                                                     <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="details_personal" placeholder="Enter personal details" name="details_personal" rows={5} cols={40}>
//                                                     </textarea>
//                                                 </label>
//                                             </p>
//                                         </li>
//                                         <li className="flex">
//                                             <p className="ml-3 text-sm leading-5 text-gray-700">
//                                                 <div className='rating_frequency'>
//                                                     {[...Array(3)].map((clock, frequency_index) => {
//                                                         frequency_index += 1;
//                                                         return (
//                                                             <button 
//                                                                 type='button' 
//                                                                 key={frequency_index} 
//                                                                 className={frequency_index <= (formFrequencyHover || formFrequencyValue) ? ("text-theme-dark-green") : ("text-navbar-green")} 
//                                                                 onClick={() => setFormFrequencyValue(frequency_index)}
//                                                                 onMouseEnter={() => setFormFrequencyHover(frequency_index)} onMouseLeave={() => setFormFrequencyHover(formFrequencyValue)}
//                                                             >
//                                                                 <span className='clock'>
//                                                                     <FaClock/>
//                                                                 </span>
//                                                             </button>
//                                                         )
//                                                     })}
//                                                 </div>
//                                             </p>
//                                         </li>
//                                         <li className="flex">
//                                             <p className="ml-3 text-sm leading-5 text-gray-700">
//                                                 <div className='rating_importance'>
//                                                     {[...Array(3)].map((gem, importance_index) => {
//                                                         importance_index += 1;
//                                                         return (
//                                                             <button 
//                                                                 type='button' 
//                                                                 key={importance_index} 
//                                                                 className={importance_index <= (formImportanceHover || formImportanceValue) ? ("text-theme-dark-green") : ("text-navbar-green")} 
//                                                                 onClick={() => setFormImportanceValue(importance_index)}
//                                                                 onMouseEnter={() => setFormImportanceHover(importance_index)} onMouseLeave={() => setFormImportanceHover(formImportanceValue)}
//                                                             >
//                                                                 <span className='gem'>
//                                                                     <FaGem/>
//                                                                 </span>
//                                                             </button>
//                                                         )
//                                                     })}
//                                                 </div>
//                                             </p>
//                                         </li>  
//                                     </ul>
//                                     <div className='mt-8 flex items-start lg:col-span-1'>
//                                         <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
//                                             <div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
//                                                 <span>
//                                                     {categoryIcon()}
//                                                 </span>
//                                             </div>
//                                             <p className="mt-4 text-sm leading-5">
//                                                 <span className="block font-medium text-gray-500 dark:text-gray-400">
//                                                     {localNeedStarterData.category}
//                                                 </span>
//                                             </p>
//                                             <div className="mt-6">
//                                                 <div className="rounded-md shadow">
//                                                     <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
//                                                         add new need
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>




// {/* <form>
//                     <>
//                     <div className="form-floating mb-3 xl:w-96">
//                         <label className="text-gray-700" htmlFor="name">
//                             <textarea className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="details_personal" placeholder="Enter personal details" name="details_personal" rows={5} cols={40}>
//                             </textarea>
//                         </label>

//                         <input 
//                             type= "text"
//                             name="details_personal"
//                             value={details_personal}
//                             onChange={handleChange}
//                             className="form-control 
//                                 block
//                                 w-full
//                                 px-3
//                                 py-1.5
//                                 text-base
//                                 font-normal
//                                 text-gray-700
//                                 bg-white bg-clip-padding
//                                 border border-solid border-gray-300
//                                 rounded
//                                 transition
//                                 ease-in-out
//                                 m-0
//                                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
//                             id="floatingInput"
//                             placeholder="details_personal"
//                         />
//                         <label htmlFor="floatingInput" className="text-gray-700">
//                             Personal Details
//                         </label>
//                     </div>
//                     <div className="form-floating mb-3 xl:w-96">
//                         <input 
//                             type= "number"
//                             name="rating_importance"
//                             value={rating_importance}
//                             onChange={handleChange}
//                             className="form-control 
//                                 block
//                                 w-full
//                                 px-3
//                                 py-1.5
//                                 text-base
//                                 font-normal
//                                 text-gray-700
//                                 bg-white bg-clip-padding
//                                 border border-solid border-gray-300
//                                 rounded
//                                 transition
//                                 ease-in-out
//                                 m-0
//                                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
//                             id="floatingInput"
//                             placeholder="rating_importance"
//                         />
//                         <label htmlFor="floatingInput" className="text-gray-700">
//                             Importance
//                         </label>
//                     </div>
//                     <div className="form-floating mb-3 xl:w-96">
//                         <input 
//                             type= "number"
//                             name="rating_frequency"
//                             value={rating_frequency}
//                             onChange={handleChange}
//                             className="form-control 
//                                 block
//                                 w-full
//                                 px-3
//                                 py-1.5
//                                 text-base
//                                 font-normal
//                                 text-gray-700
//                                 bg-white bg-clip-padding
//                                 border border-solid border-gray-300
//                                 rounded
//                                 transition
//                                 ease-in-out
//                                 m-0
//                                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
//                             id="floatingInput"
//                             placeholder="rating_frequency"
//                         />
//                         <label htmlFor="floatingInput" className="text-gray-700">
//                             Frequency
//                         </label>
//                     </div>
//                     <div>
//                         <button 
//                             type="button" 
//                             className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
//                             onClick={() => handleNewUserNeed()}
//                         >
//                             Add Need
//                         </button>
//                     </div>
//                     </>
//                 </form> */}