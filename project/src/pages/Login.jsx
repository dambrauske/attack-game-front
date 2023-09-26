import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../features/userSlice.jsx";
import Images from "../components/Images.jsx";

const Login = () => {

    const [error, setError] = useState('')
    const selectedImage = useSelector(state => state.user.image)


    const usernameRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async () => {

        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        if (selectedImage === '') return setError('Please select your warrior')

        if (username.length === 0) return setError('Username cannot be blank')
        if (username.length < 4) return setError('Username should be at least 4 characters long')

        if (password.length === 0) return setError('Password cannot be blank')
        if (password.length < 6) return setError('Password should be at least 6 characters long')

        setError('')

        const user = {
            username,
            image: selectedImage,
            password,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }


        try {
            const response = await fetch('http://localhost:8000/login', options)
            const data = await response.json()
            console.log(data)
            dispatch(setToken(data.data.token))
            navigate('/home')

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="bg-gradient-to-r from-green-300 to-purple-400 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-slate-50 p-4 pt-10 rounded w-6/12 items-center">
                <Images/>
                <div className="flex flex-col gap-6 p-4 rounded justify-center items-center">
                    <input
                        className="bg-slate-200 p-1 rounded"
                        ref={usernameRef}
                        type="text" placeholder="username"/>
                    <input
                        className="bg-slate-200 p-1 rounded"
                        ref={passwordRef}
                        type="password" placeholder="password"/>
                    <button
                        onClick={login}
                        className="w-2/3 bg-blue-300 border rounded hover:bg-green-300 p-1">Start game
                    </button>

                    <div className="h-6 flex justify-center items-center text-center">
                        {error &&
                            <div
                                className={"text-red-600"}
                            >{error}</div>
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Login;
