import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";
import {setLost, setPlayer1, setPlayer2, setWon} from "../features/GameSlice.jsx";

const GameInfo = () => {

    const dispatch = useDispatch()
    const player1 = useSelector(state => state.game.player1)
    const player2 = useSelector(state => state.game.player2)
    const userUsername = useSelector(state => state.user.username)
    const loser = useSelector(state => state.game.lost)
    const winner = useSelector(state => state.game.won)

    const playerTurn = player1.attackTurn





    useEffect(() => {
        socket().on('attackData', (data) => {
            console.log('ATTACK DATA:');
            console.log(data)
            dispatch(setPlayer1(data[0]))
            dispatch(setPlayer2(data[1]))

            if (data[0].hp <= 0) {
                    dispatch(setLost(data[0].username))
                    dispatch(setWon(data[1].username))
            }

            if (data[1].hp <= 0) {
                dispatch(setLost(data[1].username))
                dispatch(setWon(data[0].username))
            }


            if (playerTurn === userUsername) {
                console.log('It is your turn to attack.')
            } else {
                console.log('It is not your turn to attack.');
            }

        });

        // socket().on('gameOver', (data) => {
        //     console.log(data)
        //     dispatch(setLost(data.lost))
        //     dispatch(setWon(data.won))
        // });

        // Clean up the event listener when the component unmounts
        return () => {
            socket().off('attackData');
        };
    }, []);

    const attack = () => {
        console.log('attack clicked')

        if (playerTurn === userUsername) {
            socket().emit('sendAttackData', player1, player2)
        }

    };

    return (
        <div className="flex flex-col gap-8 text-white items-center justify-center">
            <div>{playerTurn} turn</div>
            <button
                onClick={attack}
                className="bg-purple-800 px-4 py-2 tracking-wider rounded hover:bg-purple-600"
            >ATTACK
            </button>
            <div className="h-10">
                {
                    winner &&
                    <div className="text-red-800 text-xl">{winner} won!</div>
                }
            </div>

        </div>
    );
};

export default GameInfo;
