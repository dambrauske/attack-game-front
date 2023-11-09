import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";
import {setReceiver, setSender} from "../features/requestSlice.jsx";
import {setLost, setWon} from "../features/GameSlice.jsx";

const UserCard = ({user}) => {

    console.log('user', user)

    const currentUserUsername = useSelector(state => state.user.username)
    const userEquipment = useSelector(state => state.items.fightEquipment)
    const dispatch = useDispatch()
    const requestToPlay = (sender, receiver) => {
        console.log('requestToPlay', sender, receiver)
        dispatch(setLost(''))
        dispatch(setWon(''))

        const hasWeapon = userEquipment.some(item => item.name === 'weapon')

        if (hasWeapon) {
            socket().emit('sendGameRequest', sender, receiver)
            dispatch(setSender(sender))
            dispatch(setReceiver(receiver))
        } else {
            alert('You need a weapon in your equipment in order to request to play')
        }
    }

    return (
        <div>
            {
                user.username !== currentUserUsername &&
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
                            onClick={() => requestToPlay(currentUserUsername, user.username)}
                            className="bg-purple-900 rounded px-4 py-1">request to play</button>
                    </div>
                </div>
            }
        </div>



    );
};

export default UserCard;
