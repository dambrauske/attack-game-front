import React from 'react';
import Progressbar from "./Progressbar.jsx";
import EquipmentItemInFight from "./EquipmentItemInFight.jsx";

const PlayerCard = ({user}) => {

    return (
        <div className="p-4 border rounded w-60 flex flex-col gap-2">
            <div className="text-white">{user.username}</div>
            <div className="flex gap-1 items-center text-white">
                <div className="w-4 h-4">
                    <img className="w-full h-full object-contain" src="https://cdn.pixabay.com/photo/2016/08/13/07/07/currency-1590337_1280.png" alt=""/>
                </div>
                <div className="rounded">{user.money}</div>
            </div>
            <div className="w-full h-60 border-2 rounded bg-slate-400">
                <img className="w-full h-full object-cover" src={user.image} alt=""/>
            </div>
            <Progressbar
            width={user.hp}
            />
            <div className="flex justify-center gap-2">

                {user?.equipment?.map((item, i)=>(<EquipmentItemInFight
                    key={i}
                    item={item}
                />))}


            </div>
        </div>
    );
};

export default PlayerCard;
