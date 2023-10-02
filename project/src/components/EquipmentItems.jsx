import React from 'react';
import SingleEquipmentItem from "./SingleEquipmentItem.jsx";
import {useSelector} from "react-redux";

const EquipmentItems = () => {

    const fightEquipment = useSelector(state => state.items.fightEquipment)
    const armour = fightEquipment.find(item => item.name === 'armour')
    const potion = fightEquipment.find(item => item.name === 'potion')
    const weapon = fightEquipment.find(item => item.name === 'weapon')


    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="w-full bg-violet-800 text-center py-1 rounded text-slate-50">
                Yor equipment for the fight
            </div>
            <div className="flex gap-10 justify-center">
                <div className="flex flex-col gap-2 items-center justify-between bg-slate-800 text-slate-100 rounded  p-2">
                    <div className="w-52 h-36">
                        {
                            weapon &&
                            <SingleEquipmentItem
                                item={weapon}
                            />
                        }
                    </div>

                    <div className="bg-slate-200 px-1 rounded text-black">weapon</div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-between bg-slate-800 text-slate-100 rounded  p-2">
                    <div className="w-48 h-28">

                        {
                            armour &&
                            <SingleEquipmentItem
                                item={armour}
                            />
                        }
                    </div>

                    <div className="bg-slate-200 px-1 rounded text-black">armour</div>

                </div>

                <div className="flex flex-col gap-2 items-center justify-between bg-slate-800 text-slate-100 rounded  p-2">
                    <div className="w-48 h-28">

                        {
                            potion &&
                            <SingleEquipmentItem
                                item={potion}
                            />
                        }
                    </div>

                    <div className="bg-slate-200 px-1 rounded text-black">potion</div>

                </div>

            </div>

        </div>
    );
};

export default EquipmentItems;
