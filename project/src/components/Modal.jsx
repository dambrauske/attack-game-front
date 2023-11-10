import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setModal} from "../features/userSlice.jsx";

const Modal = ({acceptGame, declineGame}) => {

    const dispatch = useDispatch()
    const sender = useSelector(state => state.request.sender)
    const username = useSelector(state => state.user.username)


    return (
        <div className={"relative flex justify-center items-center"}>
            <div className={"fixed top-0 border-2 left-0 right-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-50 z-20"}></div>
            <div className={"bg-slate-500 h-40 w-96 flex justify-center items-center flex-col gap-4 absolute top-20 z-30 rounded"}>
                <div
                    onClick={() => dispatch(setModal(false))}
                    className={"absolute top-0 right-0 border border-slate-400 w-8 h-8 flex justify-center items-center rounded hover:bg-red-400 cursor-pointer hover:border-0"}>
                    <i className="fas fa-times text-xl"></i>
                </div>
                <div>
                    {sender} invites you to a fight. Do you accept?
                </div>
                <div className="flex gap-8">
                    <button
                        onClick={() => acceptGame(sender, username)}
                        className={"bg-purple-800 px-2 py-1 rounded w-20 self-center hover:bg-purple-600 text-white"}>Accept
                    </button>
                    <button
                        onClick={() => declineGame(sender)}
                        className={"bg-slate-800 px-2 py-1 rounded w-20 self-center hover:bg-slate-600 text-white"}>Decline
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Modal;
