import React, {useEffect, useRef} from 'react';
import socket from "../socket.jsx";
import ItemsGeneration from "../components/ItemsGeneration.jsx";
import Navbar from "../components/Navbar.jsx";
import Inventory from "../components/Inventory.jsx";
import EquipmentItems from "../components/EquipmentItems.jsx";
import AllUsers from "../components/AllUsers.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearGeneratedItems, setGeneratedItems, setFightEquipment} from "../features/itemsSlice.jsx";
import {setLoggedInUsers, setModal, setMoney} from "../features/userSlice.jsx";
import Modal from "../components/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {setLost, setPlayer1, setPlayer2, setWon} from "../features/GameSlice.jsx";
import {setReceiver, setSender, setSenderMessage} from "../features/requestSlice.jsx";

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.user.token)
    const price = useSelector(state => state.items.itemsGenerationPrice)
    const modal = useSelector(state => state.user.modal)
    const inventory = useSelector(state => state.game.inventory)

    console.log(inventory)

    useEffect(() => {
        socket().emit('getEquipment', ({token}))
        socket().on('equipment', (equipment) => {
            dispatch(setFightEquipment(equipment))
        })

        socket().on('acceptedGameRequest', (data) => {
            console.log('data from accepted game request', data)
            dispatch(setPlayer1(data.player1))
            dispatch(setPlayer2(data.player2))
        })

        socket().on('declinedGameRequest', (message) => {
            console.log('message from declined game request', message)
        })


        socket().on('loggedInUsers', (loggedInUsers) => {
            console.log('loggedInUsers', loggedInUsers)
            dispatch(setLoggedInUsers(loggedInUsers))
        })

        socket().on('gameRequest', (data) => {
            console.log('Received game request:', data)
            console.log('Received game request sender:', data.sender)
            dispatch(setModal(true))
            dispatch(setSender(data.sender))
            dispatch(setReceiver(data.receiver))
            dispatch(setSenderMessage(data.message))
        })

        socket().on('otherUserAcceptedGameRequest', (data) => {
            console.log('Received game accepted', data)
            if (data.data.message === "Game accepted") {
                dispatch(setSender(data.data.sender))
                dispatch(setReceiver(data.data.receiver))
                alert(data.data.message)
                dispatch(setPlayer1(data.player1))
                dispatch(setPlayer2(data.player2))
                setTimeout(() => {
                    navigate('/game')
                }, 5000)
            }

        })

        return () => {
            socket().off('equipment')
            socket().off('declinedGameRequest')
            socket().off('StartGameData')
            socket().off('loggedInUsers')
            socket().off('acceptedGameRequest')
            socket().off('gameRequest')
            socket().off('otherUserAcceptedGameRequest')
        }

    }, [])


    const generateItems = () => {
        console.log('generate items clicked')
        dispatch(clearGeneratedItems())
        socket().emit('generateItems', ({token, price}))
        socket().on('itemsGenerated', (data) => {
            dispatch(setGeneratedItems(data.items))
            dispatch(setMoney(data.updatedMoney))
        })
    }

    const userEquipment = useSelector(state => state.items.fightEquipment)

    const userEquipmentRef = useRef(userEquipment);
    userEquipmentRef.current = userEquipment


    const acceptGame = (sender, receiver) => {
        console.log(sender, receiver)
        dispatch(setModal(false))
        alert('You have 5 seconds to choose your equipment for the game')
        dispatch(setLost(''))
        dispatch(setWon(''))

        setTimeout(() => {
            const hasWeapon = userEquipmentRef.current.some(item => item.name === 'weapon')

            if (hasWeapon) {
                socket().emit('acceptGameRequest', sender, receiver)
                setTimeout(() => {
                    navigate("/game")
                }, 5000)

            } else {
                alert('You have no weapon, so fight is cancelled')
                socket().emit('declineGameRequest', receiver)
            }

        }, 5000)

    }

    useEffect(() => {
        userEquipmentRef.current = userEquipment
    }, [userEquipment])


    const declineGame = (sender) => {
        dispatch(setModal(false))
        socket().emit('declineGameRequest', sender)
    }

    return (

        <div className="flex flex-col min-h-screen bg-cover bg-[url('./assets/31.jpg')] ">
            {
                modal &&
                <Modal
                    acceptGame={acceptGame}
                    declineGame={declineGame}
                />
            }

            <Navbar/>
            <div className="flex p-2">

                <div className="w-2/3">
                    <div className="flex justify-center items-center rounded px-10">
                        <ItemsGeneration/>
                        <div className="flex justify-center">
                            <button
                                onClick={generateItems}
                                className="bg-purple-950 px-3 py-1 rounded hover:bg-purple-800 text-slate-100">
                                Generate
                            </button>
                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 rounded p-2">
                        <Inventory/>
                        <EquipmentItems/>
                    </div>
                </div>

                <div className="bg-slate-800 rounded text-slate-100 p-2 w-1/3 h-full">
                    <div>users to play with</div>
                    <AllUsers/>
                </div>
            </div>
        </div>
    );
};

export default Home;
