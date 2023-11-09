import React, {useState} from 'react';
import Tooltip from "./Tooltip.jsx";
import {setArmour, setPotion, setWeapon} from "../features/itemsSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";

const SingleEquipmentItem = ({item}) => {

    const [showOnHover, setShowOnHover] = useState(false);
    const token = useSelector(state => state.user.token)

    const onHover = () => {
        setShowOnHover(true);
    }

    const onLeaveHover = () => {
        setShowOnHover(false);
    }

    const removeFromEquipment = (itemId) => {
        socket().emit('deleteFromEquipment', ({token, itemId}))
        socket().on('updatedEquipment', (data) => {
            console.log('updatedEquipment', data)
        })
    }

    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            className="relative flex gap-4 p-2">
            <img className="w-14 h-14 object-contain" src={item.image} alt=""/>
            <div className="felx flex-col text-sm leading-tight	">
                <div>
                    {
                        item.grade &&
                        <div>Grade: {item.grade}</div>
                    }
                </div>
                <div>
                    {
                        item.damage &&
                        <div>Damage: {item.damage}</div>
                    }
                </div>
                <div>
                    {
                        item.hp &&
                        <div>Restores HP: {item.hp}</div>
                    }
                </div>

                <div>
                    {
                        item.generateGold &&
                        <div>Generates gold: {item.generateGold}</div>
                    }
                </div>
                <div>
                    {
                        item.armour &&
                        <div>Armour: {item.armour}</div>
                    }
                </div>
            </div>

            {
                showOnHover &&
                <div
                    onClick={() => removeFromEquipment(item._id)}
                    className="absolute top-0 right-0 bg-red-300 text-slate-800 h-4 w-4 flex justify-center items-center">
                    <i className="fas fa-times"></i>
                </div>
            }
        </div>

    );
};

export default SingleEquipmentItem;
