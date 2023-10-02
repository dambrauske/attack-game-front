import React from 'react';

const EquipmentItemInFight = ({item}) => {

    return (
        <div className="rounded w-12 h-12 p-2 bg-slate-800">
            <img className="w-full h-full object-cover" src={item.image} alt=""/>
        </div>
    );
};

export default EquipmentItemInFight;
