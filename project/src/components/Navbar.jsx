import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {

    const navigate = useNavigate()
    const money = useSelector(state => state.user.money)
    const username = useSelector(state => state.user.username)
    const image = useSelector(state => state.user.image)

    const logout = () => {
        navigate('/')
        localStorage.clear()
    }

    return (
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 gap-10 text-slate-300">
            <div className="flex items-center justify-center gap-4">
                <div className="flex gap-2 items-center pr-3 py-1 rounded">
                    <div className="w-10 h-10">
                        <img className="w-full h-full object-cover rounded" src={image} alt=""/>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="font-bold underline">{username}</div>
                        <div className="rounded">Money: {money}$</div>
                    </div>
                </div>

            </div>

            <button
                className="bg-purple-950 px-3 py-1 rounded"
            onClick={logout}
            >Logout</button>
        </div>
    );
};

export default Navbar;
