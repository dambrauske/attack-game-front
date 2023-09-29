import React from 'react';

const Tooltip = ({item}) => {
    return (
        <div

            className="w-28 h-min bg-slate-900 text-slate-100 rounded border flex flex-col border-slate-700 absolute top-0 left-full text-xs p-1 z-50">
            <div className="uppercase tracking-wider underline mb-1">{item.name}</div>
            <div className="leading-tight	">
                {
                    item.grade &&
                    <div>Grade: {item.grade}</div>
                }
            </div>
            <div>
                {
                    item.hp &&
                    <div>Restores HP: {item.hp}</div>
                }
            </div>
            <div>
                {
                    item.effects && item.effects.length > 0 &&
                    <div className="flex flex-col">
                        <div>Effects:</div>
                        <ul className="list-disc ml-4">
                            {item.effects.map((effect, i) => (
                                <li
                                    key={i}
                                >{effect}
                                </li>
                            ))}
                        </ul>
                    </div>

                }
            </div>

            <div>
                {
                    item.generateGold &&
                    <div>Generate gold: {item.generateGold}</div>
                }
            </div>
        </div>
    );
};

export default Tooltip;
