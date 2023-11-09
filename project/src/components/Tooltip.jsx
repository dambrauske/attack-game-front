import React from 'react';

const Tooltip = ({item}) => {
    return (
        <div className="w-28 h-min bg-slate-900 text-slate-100 rounded border flex flex-col border-slate-700 absolute top-0 left-full text-xs p-1 z-50">
            <div className="uppercase tracking-wider underline mb-1">{item.name}</div>
            <div className="leading-tight">
                {
                    item.grade &&
                    <div>Grade: {item.grade}</div>
                }

                {
                    item.hp &&
                    <div>Restores HP: {item.hp}</div>
                }

                {
                    item.generateGold &&
                    <div>Generate gold: {item.generateGold}</div>
                }
                {
                    item.armour &&
                    <div> + {item.armour} armour</div>
                }

                {
                    item.damage &&
                    <div> + {item.damage} damage</div>
                }

            </div>
        </div>
    );
};

export default Tooltip;
