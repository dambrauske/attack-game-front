import React from 'react';
import {useSelector} from "react-redux";
import socket from "../socket.jsx";
import {useNavigate} from "react-router-dom";

const GameInfo = () => {

    const navigate = useNavigate()
    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)
    const userUsername = useSelector(state => state.user.username)
    const winner = useSelector(state => state.game.won)
    const playerTurn = player1.attackTurn

    const attack = (player1, player2) => {
        console.log('attack clicked')
        if (playerTurn === userUsername) {
            socket().emit('sendAttackData', player1, player2)
        }
    }

    const backToHome = () => {
        socket().emit('leaveRoom', 'gameRoom')
        navigate('/home')
    }

    return (
        <div className="flex flex-col gap-8 text-white items-center justify-center">
            { !winner &&
                <div>{playerTurn} turn</div>
            }
            {
                playerTurn === userUsername && !winner &&
                <button
                    onClick={() => attack(player1, player2)}
                    className="bg-purple-800 px-4 py-2 tracking-wider rounded hover:bg-purple-600">
                    ATTACK</button>
            }

            <div className="h-10">
                {
                    winner &&
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="text-red-800 text-xl">{winner} won!</div>
                        <button
                            onClick={backToHome}
                            className="bg-purple-950 px-3 py-1 rounded hover:bg-purple-800 text-white text-left"
                        >Go back to main page
                        </button>
                    </div>
                }
            </div>

        </div>
    );
};

export default GameInfo;
