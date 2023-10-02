import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";
import {setReceiverUsername, setSenderSocketId, setSenderUsername} from "../features/requestSlice.jsx";

const UserCard = ({user}) => {

    const username = useSelector(state => state.user.username)
    const userEquipment = useSelector(state => state.items.fightEquipment)
    const dispatch = useDispatch()
    const requestToPlay = (targetSocketId, sender, receiver) => {

        const hasWeapon = userEquipment.some(item => item.name === 'weapon');

        if (hasWeapon) {
            socket().emit('sendGameRequest', targetSocketId, sender, receiver)
            dispatch(setSenderSocketId(targetSocketId))
            dispatch(setSenderUsername(sender))
            dispatch(setReceiverUsername(receiver))
        } else {
            alert('You need a weapon in your equipment in order to request to play')
        }
    }

    return (
        <div>
            {
                user.username !== username &&
                <div className="flex p-4 rounded bg-slate-700 justify-between">
                    <div className="w-16 h-16">
                        <img
                            className="w-full h-full object-cover"
                            src={user.image}
                            alt=""/>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>{user.username}</div>
                        <button
                            onClick={() => requestToPlay(user.socketId, username, user.username)}
                            className="bg-purple-900 rounded px-4 py-1">request to play</button>
                    </div>
                </div>
            }
        </div>



    );
};

export default UserCard;
