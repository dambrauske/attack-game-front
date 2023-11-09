import React from 'react';

const Progressbar = ({width}) => {
    console.log('width', width)

    return (
        <div className="w-full h-6 border rounded">
            <div
                style={{width: `${width}%`}}
                className="h-full rounded bg-green-500"></div>
        </div>
    );
};

export default Progressbar;
