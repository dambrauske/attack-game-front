import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import socket from "./socket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setImages} from "./features/userSlice.jsx";
import {setGeneratedItems} from "./features/itemsSlice.jsx";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        socket().on('images', (images) => {
            dispatch(setImages(images))
        })



    }, [])

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App
