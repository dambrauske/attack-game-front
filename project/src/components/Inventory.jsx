import React from 'react';
import InventoryItem from "./InventoryItem.jsx";

const Inventory = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div>Inventory</div>
            <div className="flex p-2 flex-wrap justify-center overflow-y-auto gap-2 bg-slate-200">
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
                <InventoryItem/>
            </div>

        </div>
    );
};

export default Inventory;
