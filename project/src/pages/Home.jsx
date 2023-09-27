import React, {useEffect, useState} from 'react';
import socket from "../socket.jsx";
import ItemsGeneration from "../components/ItemsGeneration.jsx";
import Navbar from "../components/Navbar.jsx";
import Inventory from "../components/Inventory.jsx";
import EquipmentItems from "../components/EquipmentItems.jsx";
import AllUsers from "../components/AllUsers.jsx";
import {useDispatch} from "react-redux";
import {setGeneratedItems} from "../features/itemsSlice.jsx";


const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
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
            socket().off('generateWeapon')
            socket().off('generatedArmour')
            socket().off('generateArmour')
            socket().off('generatedPotion')
            socket().off('generatePotion')
        }
    }, [])


    const generateItems = () => {
        socket().emit('generateWeapon')
        socket().emit('generateArmour')
        socket().emit('generatePotion')
    }


    // console.log(weaponFromBack) // causes re-renders!


    return (

        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1 flex">

                <div className="bg-slate-100 w-2/3 h-full">
                    <div className="flex flex-col justify-center gap-2 border-2 rounded p-2">
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
