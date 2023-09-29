import React, {useState} from 'react';
import Modal from "./Modal.jsx";
import {setArmour, setPotion, setWeapon} from "../features/itemsSlice.jsx";
import {useDispatch} from "react-redux";

const SingleEquipmentItem = ({item}) => {

    const [showOnHover, setShowOnHover] = useState(false);
    const dispatch = useDispatch()
    const onHover = () => {
        setShowOnHover(true);
    }

    const onLeaveHover = () => {
        setShowOnHover(false);
    }

    const removeFromEquipment = (item) => {
        if (item.name === 'weapon') {
            dispatch(setWeapon(undefined))
        }
        if (item.name === 'armour') {
            dispatch(setArmour(undefined))
        }
        if (item.name === 'potion') {
            dispatch(setPotion(undefined))
        }
    }

    return (
        <div
            onMouseEnter={onHover}
            onMouseLeave={onLeaveHover}
            className="w-24 h-24 bg-slate-200 relative">
            <img className=" w-full h-full object-contain" src={item.image} alt=""/>

            {
                showOnHover &&
                <Modal
                    item={item}
                />
            }

            {
                showOnHover &&
                <div
                    onClick={() => removeFromEquipment(item)}
                    className="absolute top-0 right-0 bg-red-300 text-slate-800 h-4 w-4 flex justify-center items-center">
                    <i className="fas fa-times"></i>
                </div>
            }
        </div>

    );
};

export default SingleEquipmentItem;
