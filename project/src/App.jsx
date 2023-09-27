import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import socket from "./socket.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setImages} from "./features/userSlice.jsx";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        socket().on('images', (images) => {
            console.log('Received images:', images)
            dispatch(setImages(images))
        })

    }, [])

  return (
    <div className="bg-slate-50">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
