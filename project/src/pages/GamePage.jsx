import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import PlayerCard from "../components/PlayerCard.jsx";
import GameInfo from "../components/GameInfo.jsx";
import socket from "../socket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setPlayer1, setPlayer2} from "../features/GameSlice.jsx";

const GamePage = () => {

    const dispatch = useDispatch()
    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)

    console.log('player1', player1)
    console.log('player2', player2)
    // useEffect(() => {
    //
    //     socket().emit('gameData');
    //
    //     socket().on('StartGameData', (data) => {
    //         console.log('data from game', data)
    //         dispatch(setPlayer1(data[0]))
    //         dispatch(setPlayer2(data[1]))
    //     })
    //
    // })

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-[url('./assets/31.jpg')] ">

            <Navbar/>
            <div className="p-4">
                <button className="bg-purple-950 px-3 py-1 rounded hover:bg-purple-800 text-white text-left">BACK
                </button>
                <div className="flex gap-20 justify-center">
                    <PlayerCard
                        user={player1}
                    />
                    <GameInfo
                        />
                    <PlayerCard
                        user={player2}/>
                </div>
            </div>

        </div>
    );
};

export default GamePage;
