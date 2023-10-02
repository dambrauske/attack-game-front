import React from 'react';

const GameInfo = () => {



    return (
        <div className="flex flex-col gap-8 text-white items-center justify-center">
            <div>username turn</div>
            <button
                className="bg-purple-800 px-4 py-2 tracking-wider rounded hover:bg-purple-600"
            >ATTACK</button>
        </div>
    );
};

export default GameInfo;
