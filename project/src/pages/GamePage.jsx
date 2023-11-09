import React, {useEffect} from 'react';
import Navbar from "../components/Navbar.jsx";
import PlayerCard from "../components/PlayerCard.jsx";
import GameInfo from "../components/GameInfo.jsx";
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";
import {setLost, setPlayer1, setPlayer2, setWon} from "../features/GameSlice.jsx";

const GamePage = () => {

    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)
    const userUsername = useSelector(state => state.user.username)

    const playerTurn = player1.attackTurn
    const dispatch = useDispatch()

    useEffect(() => {
        socket().on('attackData', (data) => {
            console.log('ATTACK DATA:')
            console.log(data)
            dispatch(setPlayer1(data.player1))
            dispatch(setPlayer2(data.player2))

            if (data.player1.hp <= 0) {
                dispatch(setLost(data.player1.username))
                dispatch(setWon(data.player2.username))
            }

            if (data.player2.hp <= 0) {
                dispatch(setLost(data.player2.username))
                dispatch(setWon(data.player1.username))
            }
        })

        socket().on('potionUsed', (data) => {
            console.log('potionUsed DATA:')
            console.log(data)
            dispatch(setPlayer1(data.player1))
            dispatch(setPlayer2(data.player2))
        })

        return () => {
            socket().off('attackData')
            socket().off('potionUsed')
        };
    }, [])


    return (
        <div className="flex flex-col min-h-screen bg-cover bg-[url('./assets/31.jpg')]">
            <Navbar/>
            <div className="p-4">
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
