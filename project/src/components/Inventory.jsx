import React, {useEffect} from 'react';
import InventoryItem from "./InventoryItem.jsx";
import {useSelector} from "react-redux";

const Inventory = () => {

    const inventory = useSelector(state => state.items.inventory)

    useEffect(() => {



    }, [inventory])

    console.log(inventory)

    return (
        <div className="flex flex-col items-center gap-2 w-full z-10">
            <div>Inventory</div>
                <div className="p-2 w-full min-h-[13rem] grid grid-cols-8 gap-2 bg-slate-50 rounded">
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
