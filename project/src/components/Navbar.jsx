import React from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <div className="flex justify-between p-4 bg-slate-200">
            <div>Money: <span>200</span>$</div>
            <button
            onClick={logout}
            >Logout</button>
        </div>
    );
};

export default Navbar;
