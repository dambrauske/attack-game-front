import React from 'react';
import {useSelector} from "react-redux";
import socket from "../socket.jsx";

const EquipmentItemInFight = ({item}) => {

    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)
    const currentUsername = useSelector(state => state.user.username)
    const currentUserId = useSelector(state => state.user.userId)

    const usePotion = (currentUsername, player1, player2) => {
        console.log('usePotion clicked', item)
        if (item.name === "potion") {
            socket().emit('usePotion', {currentUsername, player1, player2})
        }
    }

    return (
        <div
            onClick={() => usePotion(currentUsername, player1, player2)}
            className={`rounded w-12 h-12 p-2 bg-slate-800 ${item.name === "potion" && currentUserId === item.userId ? "cursor-pointer" : null}`}>
            <img className="w-full h-full object-cover" src={item.image} alt=""/>
        </div>
    );
};

export default EquipmentItemInFight;
