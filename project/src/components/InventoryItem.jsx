import React, {useState} from 'react';
import Tooltip from "./Tooltip.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setInventory, setFightEquipment} from "../features/itemsSlice.jsx";
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
        socket().emit('deleteFromInventory', ({token, itemId}))
        socket().on('updatedInventory', (data) => {
            dispatch(setInventory(data))
        })

        return () => {
            socket().off('updatedInventory')
        }
    }

    const takeToEquipment = (item) => {
        socket().emit('addToEquipment', ({token, item}))
        socket().on('updatedEquipment', (data) => {
            dispatch(setFightEquipment(data))
        })

        return () => {
            socket().off('updatedEquipment')
        }
    }


    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            onClick={() => takeToEquipment(item)}
            className="border rounded border-purple-500 justify-self-center w-20 h-20 hover:bg-purple-900 cursor-pointer relative p-2">
            {
                showOnHover &&
                <Tooltip
                    item={item}
                />
            }

            {
                showOnHover && item.default === false &&
                <div
                    onClick={(event) => {
                        event.stopPropagation()
                        deleteFromInventory(item._id)
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-slate-800 h-4 w-4 flex justify-center items-center z-50">
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
