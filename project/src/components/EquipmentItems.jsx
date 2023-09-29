import React from 'react';
import SingleEquipmentItem from "./SingleEquipmentItem.jsx";
import {useSelector} from "react-redux";

const EquipmentItems = () => {

    const potion = useSelector(state => state.items.potion)
    const weapon = useSelector(state => state.items.weapon)
    const armour = useSelector(state => state.items.armour)

    return (
        <div className="flex flex-col gap-4 items-center">
            <div>
                Yor equipment for the fight
            </div>
            <div className="flex gap-10 justify-center">
                <div className="flex flex-col gap-2 items-center bg-red-400 w-28 h-36 p-2">
                    <div className="w-24 h-24">
                        {
                            weapon &&
                            <SingleEquipmentItem
                                item={weapon}
                            />
                        }
                    </div>

                    <div className="">weapon</div>
                </div>

                <div className="flex flex-col gap-2 items-center bg-red-400 w-28 h-36 p-2">
                    <div className="w-24 h-24">

                        {
                            armour &&
                            <SingleEquipmentItem
                                item={armour}
                            />
                        }
                    </div>

                    <div>armour</div>

                </div>

                <div className="flex flex-col gap-2 items-center bg-red-400 w-28 h-36 p-2">
                    <div className="w-24 h-24">

                        {
                            potion &&
                            <SingleEquipmentItem
                                item={potion}
                            />
                        }
                    </div>

                    <div>potion</div>

                </div>

            </div>

        </div>
    );
};

export default EquipmentItems;
