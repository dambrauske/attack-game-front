import React from 'react';
import SingleEquipmentItem from "./SingleEquipmentItem.jsx";

const EquipmentItems = () => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div>
                Yor equipment for the fight
            </div>
            <div className="flex gap-10 flex justify-center">
                <SingleEquipmentItem/>
                <SingleEquipmentItem/>
                <SingleEquipmentItem/>
            </div>

        </div>
    );
};

export default EquipmentItems;
