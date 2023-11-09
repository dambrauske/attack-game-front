import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeFromGeneratedItems, setInventory} from "../features/itemsSlice.jsx";
import socket from "../socket.jsx";

const GeneratedItem = ({item}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const token = useSelector(state => state.user.token)

    const showModalOnHover = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }

    const takeToInventory = (item) => {
        console.log('take to inventory clicked')
        dispatch(removeFromGeneratedItems(item))
        socket().emit('addToInventory', ({token, item}))
        socket().on('updatedInventory', (data) => {
            dispatch(setInventory(data))
        })
    }

    return (
        <div
            onMouseEnter={showModalOnHover}
            onMouseLeave={hideModal}>

            <div
                onClick={() => takeToInventory(item)}
                className=" flex items-center h-36 w-52 px-4 gap-3 bg-slate-800 rounded relative hover:bg-purple-900 cursor-pointer">
                <div className="p-2 w-16 h-16">
                    <img className="w-full h-full object-contain" src={item.image} alt=""/>
                </div>
                <div className="text-slate-100 capitalize items-start flex flex-col text-sm leading-tight">
                    <div>{item.name}</div>
                    {
                        item.grade &&
                        <div>Item grade {item.grade}</div>
                    }
                    {
                        item.damage &&
                        <div> + {item.damage} damage</div>
                    }
                    {
                        item.armour > 0 &&
                        <div> + {item.armour} armour</div>
                    }{
                        item.generateGold && item.generateGold !== 0 &&
                        <div> + {item.generateGold} gold</div>
                    }
                    {
                        item.hp &&
                        <div> + {item.hp} hp</div>
                    }

                </div>
            </div>

        </div>
    );
};

export default GeneratedItem;

