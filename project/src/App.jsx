import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import socket from "./socket.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setImages, setLoggedInUsers, setMoney} from "./features/userSlice.jsx";
import GamePage from "./pages/GamePage.jsx";
import {setPlayer1, setPlayer2} from "./features/GameSlice.jsx";

function App() {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        socket().on('images', (images) => {
            dispatch(setImages(images))
        })

        socket().emit('userLoggedIn', token)

        socket().on('loggedInUsers', (loggedInUsers) => {
            dispatch(setLoggedInUsers(loggedInUsers))
        })

        socket().on('potionUsed', (data) => {
            console.log('potionUsed DATA:')
            console.log(data)
            dispatch(setPlayer1(data.player1))
            dispatch(setPlayer2(data.player2))
        })


        socket().on('winnerMoney', (money) => {
            console.log('winnerMoney DATA:')
            console.log(money)
            dispatch(setMoney(money))
        })

       return () => {
            socket().off('images')
            socket().off('loggedInUsers')
            socket().off('potionUsed')
            socket().off('winnerMoney')
       }

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
