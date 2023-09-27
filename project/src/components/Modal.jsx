import React from 'react';

const Modal = ({item}) => {
    return (
        <div

            className="w-28 h-28 bg-slate-200 rounded border flex flex-col border-slate-700 absolute top-0 left-28 text-xs p-1 ">
            <div>
                {
                    item.grade &&
                    <div>Grade: <span className="font-bold">{item.grade}</span> </div>
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

export default Modal;
