import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    setMoney,
    setToken, setUserId,
    setUserImage,
    setUsername
} from "../features/userSlice.jsx";
import socket from "../socket.jsx";
import ImageCard from "../components/ImageCard.jsx";

const Login = () => {

    const [error, setError] = useState(undefined)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const images = useSelector(state => state.user.images)
    const selectedImage = useSelector(state => state.user.image)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectImage = (image) => {
        dispatch(setUserImage(image))
    }
    const login = async () => {
        setError(undefined)

        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        if (!selectedImage) return setError('Please select your warrior')

        if (username.length === 0) return setError('Username cannot be blank')
        if (username.length < 4) return setError('Username should be at least 4 characters long')

        if (password.length === 0) return setError('Password cannot be blank')
        if (password.length < 6) return setError('Password should be at least 6 characters long')

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
            dispatch(setToken(data.data.token))
            dispatch(setUsername(data.data.username))
            dispatch(setUserId(data.data.userId))
            dispatch(setUserImage(data.data.image))
            dispatch(setMoney(data.data.money))
            socket().emit('userLogin', (data.data.token))
            navigate('/home')
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div className="bg-cover bg-[url('./assets/31.jpg')] h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-slate-950 p-4 pt-10 rounded-l w-6/12 items-center shadow-2xl	">
                <div className="flex gap-4 flex-wrap justify-center">
                    {images.map((image, i) => (
                        <ImageCard
                            onClick={() =>selectImage(image)}
                            image={image}
                            key={i}/>
                    ))}
                </div>

                <div className="flex flex-col gap-6 p-4 rounded justify-center items-center">
                    <input
                        className="bg-slate-700 text-slate-100 placeholder-slate-500 p-1 rounded outline-none"
                        ref={usernameRef}
                        type="text" placeholder="username"/>
                    <input
                        className="bg-slate-700 placeholder-slate-500 p-1 rounded outline-none"
                        ref={passwordRef}
                        type="password" placeholder="password"/>
                    <button
                        onClick={login}
                        className="w-2/3 bg-purple-800 text-indigo-200 font-bold uppercase rounded hover:bg-purple-700 p-1">Start game
                    </button>

                    <div className="h-2 flex justify-center items-center text-center">
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
