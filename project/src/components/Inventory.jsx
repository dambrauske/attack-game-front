import React, {useEffect} from 'react';
import InventoryItem from "./InventoryItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import socket from "../socket.jsx";
import {setGeneratedItems, setInventory} from "../features/itemsSlice.jsx";

const Inventory = () => {

    const inventory = useSelector(state => state.items.inventory)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()


    useEffect(() => {

        socket().emit('getInventory', ({token}))
        socket().on('inventory', (inventory) => {
            dispatch(setInventory(inventory))
        })

        return () => {
            socket().off('inventory');
        };

    }, [])


    return (
        <div className="flex flex-col items-center gap-2 w-full z-10 border rounded border-purple-500 p-2">
            <div className="w-full bg-purple-950 text-center py-1 rounded text-slate-50">Inventory</div>
            <div className="p-2 w-full min-h-[13rem] grid grid-cols-8 gap-2 rounded">
                {
                    inventory.length > 0 && inventory.map((item, i) => (
                        <InventoryItem
                            key={i}
                            item={item}
                        />
                    ))
                }
            </div>


        </div>
    );
};

export default Inventory;
