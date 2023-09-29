import React, {useEffect, useState} from 'react';
import socket from "../socket.jsx";
import ItemsGeneration from "../components/ItemsGeneration.jsx";
import Navbar from "../components/Navbar.jsx";
import Inventory from "../components/Inventory.jsx";
import EquipmentItems from "../components/EquipmentItems.jsx";
import AllUsers from "../components/AllUsers.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearGeneratedItems, getInventory, setGeneratedItems} from "../features/itemsSlice.jsx";


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
                dispatch(getInventory(data.data))
            })

        console.warn('Observe items generation')

        socket().on('generatedWeapon', (weapon) => {
            console.log('WEAPON')
            console.log('    weapon:', weapon)
            console.log('    effects:', JSON.stringify(weapon.effects))
            dispatch(setGeneratedItems(weapon))
        })

        socket().on('generatedArmour', (armour) => {
            console.log('ARMOUR')
            console.log('    armour:', armour)
            console.log('    effects:', JSON.stringify(armour.effects))
            dispatch(setGeneratedItems(armour))
        })

        socket().on('generatedPotion', (potion) => {
            console.log('POTION')
            console.log('potion:', potion)
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

        <div className="h-screen flex flex-col bg-cover bg-[url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?w=1380&t=st=1695913807~exp=1695914407~hmac=00900eec206211758f52652cbb6ec053c93e97bf934491648ce4650618b0e57e')]">

            <Navbar/>
            <div className="flex-1 flex">

                <div className="bg-slate-100 w-2/3 h-full">
                    <div className="flex justify-around items-center gap-10 border-2 rounded p-2">
                        <ItemsGeneration/>
                        <div className="flex justify-center">
                            <button
                                onClick={generateItems}
                                className="bg-slate-300 px-6 py-1">
                                Generate
                            </button>
                        </div>


                    </div>
                    <div className="flex flex-col justify-center items-center gap-8 border-2 rounded p-2 bg-slate-200">
                        <Inventory/>
                        <EquipmentItems/>
                    </div>
                </div>


                <div className="bg-blue-200 w-1/3 h-full">
                    <div>users to play with</div>
                    <AllUsers/>
                </div>
            </div>
        </div>
    );
};

export default Home;
