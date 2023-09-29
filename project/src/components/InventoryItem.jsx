import React, {useState} from 'react';
import Tooltip from "./Tooltip.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setInventory, setArmour, setPotion, setShowModal, setWeapon} from "../features/itemsSlice.jsx";
import socket from "../socket.jsx";

const InventoryItem = ({item}) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const [showOnHover, setShowOnHover] = useState(false);

    const onHover = () => {
        setShowOnHover(true);
    }

    const onLeaveHover = () => {
        setShowOnHover(false);
    }

    const deleteFromInventory = (itemId) => {
        console.log('delete from inventory clicked')

        socket().emit('deleteFromInventory', ({token, itemId}))

        socket().on('updatedInventory', (data) => {
            console.log('data from sockets inventory', data)
                dispatch(setInventory(data))
        })

    }

    const takeToBattle = (item) => {
        if (item.name === 'weapon' || item.name === 'default weapon') {
            dispatch(setWeapon(item))

        }
        if (item.name === 'armour') {
            dispatch(setArmour(item))
            //send to back
        }
        if (item.name === 'potion') {
            dispatch(setPotion(item))
            //send to back
        }
    }


    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            onClick={() => takeToBattle(item)}
            className="border rounded border-purple-500 justify-self-center w-20 h-20 hover:bg-purple-900 cursor-pointer relative p-2">
            {
                showOnHover &&
                <Tooltip
                    item={item}
                />
            }

            {
                showOnHover &&
                <div
                    onClick={() => deleteFromInventory(item._id)}
                    className="absolute top-0 right-0 bg-red-500 text-slate-800 h-4 w-4 flex justify-center items-center">
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
