import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearGeneratedItems} from "../features/itemsSlice.jsx";
import socket from "../socket.jsx";
import {setLoggedInUsers} from "../features/userSlice.jsx";

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const money = useSelector(state => state.user.money)
    const username = useSelector(state => state.user.username)
    const image = useSelector(state => state.user.image)
    const token = useSelector(state => state.user.token)

    const logout = () => {
        socket().emit('userLoggedOut', (token))
        localStorage.clear()
        dispatch(clearGeneratedItems())
        navigate('/')
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-t from-gray-900 via-purple-950 to-violet-800 gap-10 text-slate-300">
            <div className="flex items-center justify-center gap-4">
                <div className="flex gap-2 items-center pr-3 py-1 rounded">
                    <div className="w-10 h-10">
                        <img className="w-full h-full object-cover rounded" src={image} alt=""/>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="font-bold">{username}</div>
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4">
                                <img className="w-full h-full object-contain" src="https://cdn.pixabay.com/photo/2016/08/13/07/07/currency-1590337_1280.png" alt=""/>
                            </div>
                            <div className="rounded">{money}</div>
                        </div>
                    </div>
                </div>

            </div>

            <button
                className="bg-purple-950 px-3 py-1 rounded hover:bg-purple-800"
            onClick={logout}
            >Logout</button>
        </div>
    );
};

export default Navbar;
