import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import socket from "../socket.jsx";

const GameInfo = () => {

    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)
    const userUsername = useSelector(state => state.user.username)

    useEffect(() => {
        socket().on('attackData', (data) => {
            console.log('ATTACK DATA:');
            console.log(data);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket().off('attackData');
        };
    }, []);

    const attack = () => {
        console.log('attack clicked');
        if ((player1.username === userUsername && player1.attackTurn) ||
            (player2.username === userUsername && player2.attackTurn)) {
            socket().emit('sendAttackData', player1, player2);
        }
    };

    return (
        <div className="flex flex-col gap-8 text-white items-center justify-center">
            <div>username turn</div>
            <button
                onClick={attack}
                className="bg-purple-800 px-4 py-2 tracking-wider rounded hover:bg-purple-600"
            >ATTACK</button>
        </div>
    );
};

export default GameInfo;
