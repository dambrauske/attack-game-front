import React, {useEffect, useState} from 'react';
import socket from "../socket.jsx";
import ItemsGeneration from "../components/ItemsGeneration.jsx";
import Navbar from "../components/Navbar.jsx";
import Inventory from "../components/Inventory.jsx";
import EquipmentItems from "../components/EquipmentItems.jsx";
import AllUsers from "../components/AllUsers.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearGeneratedItems, setInventory, setGeneratedItems} from "../features/itemsSlice.jsx";


const Home = () => {

    const dispatch = useDispatch()
    const inventory = useSelector(state => state.items.inventory)

    useEffect(() => {

        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem('token')
            },
            body: null
        }

        fetch('http://localhost:8000/getInventory', options)
            .then(res => res.json())
            .then(data => {
                dispatch(setInventory(data.data))
            })

        // fetch('http://localhost:8000/getUser', options)
        //     .then(res => res.json())
        //     .then(data => {
        //         dispatch(getInventory(data.data))
        //     })


        console.warn('Observe items generation')

        socket().on('generatedWeapon', (weapon) => {
            console.log('  WEAPON  effects:', JSON.stringify(weapon.effects))
            dispatch(setGeneratedItems(weapon))
        })

        socket().on('generatedArmour', (armour) => {
            console.log(' ARMOUR   effects:', JSON.stringify(armour.effects))
            dispatch(setGeneratedItems(armour))
        })

        socket().on('generatedPotion', (potion) => {
            dispatch(setGeneratedItems(potion))
        })




        return () => {
            console.warn('Cleanup on component destroy')
            socket().off('generatedWeapon')
            socket().off('generatedArmour')
            socket().off('generatedPotion')
            socket().off('generatedDefaultWeapon')

        }
    }, [])


    const generateItems = () => {
        dispatch(clearGeneratedItems())
        socket().emit('generateWeapon')
        socket().emit('generateArmour')
        socket().emit('generatePotion')
    }


    // console.log(weaponFromBack) // causes re-renders!


    return (

        <div className="flex flex-col min-h-screen bg-cover bg-[url('./assets/31.jpg')] ">

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
