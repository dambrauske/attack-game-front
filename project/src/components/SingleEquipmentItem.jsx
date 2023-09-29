import React, {useState} from 'react';
import Tooltip from "./Tooltip.jsx";
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
            className="relative flex gap-4 ">
            <img className=" w-16 h-16 object-contain" src={item.image} alt=""/>
            <div className="felx flex-col text-sm leading-tight	">
                <div>
                    {
                        item.grade &&
                        <div>Grade: {item.grade}</div>
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
                        item.effects && item.effects.length > 0 &&
                        <div className="flex flex-col">
                            <div>Effects:</div>
                            <ul className="list-disc ml-4">
                                {item.effects.map((effect, i) => (
                                    <li
                                        key={i}
                                    >{effect}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    }
                </div>

                <div>
                    {
                        item.generateGold &&
                        <div>Generate gold: {item.generateGold}</div>
                    }
                </div>
            </div>



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
