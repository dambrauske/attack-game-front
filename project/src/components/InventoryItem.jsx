import React, {useState} from 'react';
import Modal from "./Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getInventory, setArmour, setPotion, setShowModal, setWeapon} from "../features/itemsSlice.jsx";

const InventoryItem = ({item}) => {

    const dispatch = useDispatch()

    const [showOnHover, setShowOnHover] = useState(false);

    const onHover = () => {
        setShowOnHover(true);
    }

    const onLeaveHover = () => {
        setShowOnHover(false);
    }

    const deleteFromInventory = async (itemId) => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({itemId})
        }

        try {
            const response = await fetch('http://localhost:8000/deleteItem', options)
            const data = await response.json()
            console.log(data)
            if (data.error === false) {
                dispatch(getInventory(data.data))
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const takeToBattle = (item) => {
        if (item.name === 'weapon' || item.name === 'default weapon') {
            dispatch(setWeapon(item))
        }
        if (item.name === 'armour') {
            dispatch(setArmour(item))
        }
        if (item.name === 'potion') {
            dispatch(setPotion(item))
        }
    }


    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            onClick={() => takeToBattle(item)}
            className="bg-slate-300 rounded justify-self-center w-20 h-20 hover:bg-slate-200 cursor-pointer relative">
            {
                showOnHover &&
                <Modal
                    item={item}
                />
            }

            {
                showOnHover &&
                <div
                    onClick={() => deleteFromInventory(item._id)}
                    className="absolute top-0 right-0 bg-red-300 text-slate-800 h-4 w-4 flex justify-center items-center">
                    <i className="fas fa-times"></i>
                </div>
            }

            <img className="w-full h-full object-contain"
                 src={item.image}
                 alt="inventory item"/>
        </div>
    );
};

export default InventoryItem;
