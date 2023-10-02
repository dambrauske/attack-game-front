import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import socket from "./socket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clearLoggedInUsers, setImages, setLoggedInUsers, setModal} from "./features/userSlice.jsx";
import {setGeneratedItems} from "./features/itemsSlice.jsx";
import {setReceiverUsername, setSenderMessage, setSenderSocketId, setSenderUsername} from "./features/requestSlice.jsx";
import GamePage from "./pages/GamePage.jsx";

function App() {
    const token = useSelector(state => state.user.token)

    const dispatch = useDispatch()

    useEffect(() => {
        socket().on('images', (images) => {
            dispatch(setImages(images))
        })

        socket().on('loggedInUsers', (loggedInUsers) => {
            dispatch(setLoggedInUsers(loggedInUsers))
        })

        socket().on('gameRequest', (data) => {
            console.log('Received game request:', data)
            console.log('Received game request sender:', data.sender)
            dispatch(setModal(true))
            dispatch(setSenderUsername(data.sender))
            dispatch(setReceiverUsername(data.receiver))
            dispatch(setSenderSocketId(data.senderId))
            dispatch(setSenderMessage(data.message))
        })

        // window.addEventListener('beforeunload', () => {
        //     socket.emit('userDisconnect', token)
        //     socket.disconnect()
        // })
        //
        // return () => {
        //     window.removeEventListener('beforeunload', () => {
        //         socket.emit('userDisconnect', token)
        //         socket.disconnect()
        //     })
        // }

    }, [])


    return (
        <div className="min-h-screen">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/game' element={<GamePage/>}/>
            </Routes>
        </div>
    )
}

export default App
