import { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { FaDoorOpen, FaUserPlus } from 'react-icons/fa';
import { useLoginUserMutation, useRegisterUserMutation } from "../services/authApi";
import { toast } from 'react-toastify';
import { setAuth } from "../features/authSlice";


const initialState = {
    username: "",
    email: "",
    password: "",
    birthdate: "",
    location: "",
    avatar: ""
};

const Auth = () => {
    const [formValue, setFormValue] = useState(initialState);

    const {username, email, password, birthdate, location, avatar} = formValue;
    const [showSignup, setShowSignup] = useState(false);

    const dispatch = useAppDispatch();

    const [loginUser, {data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError}] = useLoginUserMutation();
    const [registerUser, {data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: registerError}] = useRegisterUserMutation();

    const handleClick = () => {
        const switchShow = !showSignup
        setShowSignup(switchShow)
    };

    const handleChange = (e: any) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    };

    const handleLogin = async () => {
        if(username && password) {
            await loginUser({username, password});
        } else {
            toast.error("Please fill out all Input fields")
        }
    };


    const handleSignup = async () => {
        if(username && email && password && birthdate && location && avatar) {
            await registerUser({ username, email, password, birthdate, location, avatar });
        } else {
            toast.error("Please fill out all input fields")
        }
    };


    useEffect(() => {
        if(isLoginSuccess) {
            toast.success("User Logged In Successfully");
            dispatch(setAuth({ username: loginData.user.username, email: loginData.user.email, birthdate: loginData.user.birthdate, location: loginData.user.location, avatar: loginData.user.avatar, token: loginData.jwt }));
        }

        if(isRegisterSuccess) {
            toast.success("Success! Welcome to tend")
            dispatch(setAuth({ username: registerData.user.username, email: registerData.user.email, birthdate: registerData.user.birthdate, location: registerData.user.location, avatar: registerData.user.avatar, token: registerData.jwt }));
        }
        // eslint-disable-next-line
    }, [isLoginSuccess, isRegisterSuccess])
    

    useEffect(() => {
        if(isLoginError) {
            toast.error((loginError as any).data.message);
        }

        if(isRegisterError) {
            toast.error((registerError as any).data.message);
        }
        // eslint-disable-next-line
    }, [isLoginError, isRegisterError])

    return (
        <section className="bg-navbar-green h-screen">
            <div className="p-10 h-full text-theme-xx-dark-grey">
                <div
                className="bg-white flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full w-10/12 g-6 m-auto rounded-lg shadow-2xl overflow-hidden"
                >
                <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <div className="flex justify-center">
                        <video autoPlay loop muted>
                            <source src={require("../assets/logos/tend-Logo-pop.mp4")} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <div className='w-full p-8 lg:w-1/2'>
                        <div className="flex justify-center">
                            <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                                <div className="py-3 px-6 border-b border-gray-300">
                                    {!showSignup ? (
                                        <button className="btn" onClick={handleClick} >
                                            <FaDoorOpen />
                                        </button> 
                                        ) : (
                                        <button className="btn" onClick={handleClick} >
                                            <FaUserPlus />
                                        </button>
                                        )
                                    } 
                                </div>
                                <div className="p-6">
                                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                                        {!showSignup ? "Login" : "Sign Up"}
                                    </h5>
                                    <>    
                                        <form>
                                            <div className="form-floating mb-3 xl:w-96">
                                                <input 
                                                    type= "text"
                                                    name="username"
                                                    value={username}
                                                    onChange={handleChange}
                                                    className="form-control 
                                                        block
                                                        w-full
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                    id="floatingInput"
                                                    placeholder="Username"
                                                />
                                                <label htmlFor="floatingInput" className="text-gray-700">
                                                    Username
                                                </label>
                                            </div>
                                            {showSignup && (
                                                <div className="form-floating mb-3 xl:w-96">
                                                    <input 
                                                        type= "email" 
                                                        name="email"
                                                        value={email}
                                                        onChange={handleChange}
                                                        className="form-control 
                                                            block
                                                            w-full
                                                            px-3
                                                            py-1.5
                                                            text-base
                                                            font-normal
                                                            text-gray-700
                                                            bg-white bg-clip-padding
                                                            border border-solid border-gray-300
                                                            rounded
                                                            transition
                                                            ease-in-out
                                                            m-0
                                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                        id="floatingInput"
                                                        placeholder="Email address"
                                                    />
                                                    <label htmlFor="floatingInput" className="text-gray-700">
                                                        Email address
                                                    </label>
                                                </div>
                                            )}
                                            <div className="form-floating mb-3 xl:w-96">
                                                <input 
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={handleChange} 
                                                    className="form-control
                                                        block
                                                        w-full
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                    id="floatingPassword" 
                                                    placeholder="Password"
                                                />
                                                <label htmlFor="floatingPassword" className="text-gray-700">
                                                    Password
                                                </label>
                                            </div>
                                            {showSignup && (
                                                <>
                                                    <div className="form-floating mb-3 xl:w-96">
                                                        <input 
                                                            type="text"
                                                            name="birthdate"
                                                            value={birthdate}
                                                            onChange={handleChange}
                                                            className="form-control
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                            id="floatingInput" 
                                                            placeholder="Birthdate"
                                                        />
                                                        <label htmlFor="floatingInput" className="text-gray-700">
                                                            Birthdate
                                                        </label>
                                                    </div>
                                                    <div className="form-floating mb-3 xl:w-96">
                                                        <input 
                                                            type="text"
                                                            name="location"
                                                            value={location}
                                                            onChange={handleChange}
                                                            className="form-control
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                            id="floatingInput" 
                                                            placeholder="Location"
                                                        />
                                                        <label htmlFor="floatingInput" className="text-gray-700">
                                                            Location
                                                        </label>
                                                    </div>
                                                    <div className="form-floating mb-3 xl:w-96">
                                                        <input 
                                                            type="text"
                                                            name="avatar"
                                                            value={avatar}
                                                            onChange={handleChange}
                                                            className="form-control
                                                                block
                                                                w-full
                                                                px-3
                                                                py-1.5
                                                                text-base
                                                                font-normal
                                                                text-gray-700
                                                                bg-white bg-clip-padding
                                                                border border-solid border-gray-300
                                                                rounded
                                                                transition
                                                                ease-in-out
                                                                m-0
                                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                            id="floatingInput" 
                                                            placeholder="Avatar"
                                                        />
                                                        <label htmlFor="floatingInput" className="text-gray-700">
                                                            Avatar
                                                        </label>
                                                    </div>
                                                </>
                                            )}
                                        </form>
                                    </>
                                    {!showSignup ? (
                                        <button 
                                            type="button" 
                                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            onClick={() => handleLogin()}
                                        >
                                            Login
                                        </button>
                                    ) : (
                                        <button 
                                            type="button" 
                                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            onClick={() => handleSignup()}
                                        >
                                            Sign Up
                                        </button>
                                    )}
                                </div>
                                <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                                ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
};

export default Auth;