import React, {useEffect, useRef} from 'react';
import socket from "../socket.jsx";
import ItemsGeneration from "../components/ItemsGeneration.jsx";
import Navbar from "../components/Navbar.jsx";
import Inventory from "../components/Inventory.jsx";
import EquipmentItems from "../components/EquipmentItems.jsx";
import AllUsers from "../components/AllUsers.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearGeneratedItems, setGeneratedItems, setFightEquipment} from "../features/itemsSlice.jsx";
import {setModal, setMoney} from "../features/userSlice.jsx";
import Modal from "../components/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {setLost, setPlayer1, setPlayer2, setWon} from "../features/GameSlice.jsx";


const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(state => state.user.token)
    const price = useSelector(state => state.items.itemsGenerationPrice)
    const modal = useSelector(state => state.user.modal)
    const username = useSelector(state => state.user.username)
    const sender = useSelector(state => state.request.sender)
    const receiver = useSelector(state => state.request.receiver)

    useEffect(() => {

        console.warn('Observe items generation')

        socket().emit('getEquipment', ({token}))
        socket().on('equipment', (equipment) => {
            dispatch(setFightEquipment(equipment))
        })

        socket().on('acceptedGameRequest', (data) => {
            console.log('data from accepted game request', data)
            navigate("/game")
            socket().emit('joinGame', data.sender, data.receiver)
        })

        socket().on('declinedGameRequest', (message) => {
            console.log('message from declined game request', message)
        })

        socket().on('StartGameData', (gameData) => {
            console.log('StartGameData', gameData)
            dispatch(setPlayer1(gameData[0]))
            dispatch(setPlayer2(gameData[1]))

        })

        return () => {
            console.warn('Cleanup on component destroy')
            socket().off('generatedItems')
            socket().off('generatedDefaultWeapon')
        }
    }, [])


    const generateItems = () => {
        console.log('generate items clicked')
        dispatch(clearGeneratedItems())
        // socket().emit('getUserMoney', ({token}))
        socket().emit('generateItems', ({token, price}))
        socket().on('itemsGenerated', (data) => {
            dispatch(setGeneratedItems(data.items))
            dispatch(setMoney(data.updatedMoney))
        })
    }

    const userEquipment = useSelector(state => state.items.fightEquipment)
    const senderId = useSelector(state => state.request.senderSocketId)

    const userEquipmentRef = useRef(userEquipment);
    userEquipmentRef.current = userEquipment


    const acceptGame = (senderId, sender, receiver) => {
        dispatch(setModal(false))
        alert('You have 5 seconds to choose your equipment for the game')
        dispatch(setLost(''))
        dispatch(setWon(''))

        setTimeout(() => {
            const hasWeapon = userEquipmentRef.current.some(item => item.name === 'weapon')


            if (hasWeapon) {
                socket().emit('acceptGameRequest', senderId, sender, receiver)
                navigate("/game")
                joinGame(sender, receiver)

            } else {
                alert('You have no weapon, so fight is cancelled')
                socket().emit('declineGameRequest', senderId)
            }

        }, 5000)

    }

    useEffect(() => {
        userEquipmentRef.current = userEquipment
    }, [userEquipment])

    const joinGame = (sender, receiver) => {
        socket().emit('joinGame', sender, receiver)
    }

    const declineGame = () => {
        dispatch(setModal(false))
        socket().emit('declineGameRequest', senderId)
    }


    // console.log(weaponFromBack) // causes re-renders!


    return (

        <div className="flex flex-col min-h-screen bg-cover bg-[url('./assets/31.jpg')] ">
            {
                modal &&
                <Modal
                    acceptGame={acceptGame}
                    declineGame={declineGame}
                    joinGame={joinGame}
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
