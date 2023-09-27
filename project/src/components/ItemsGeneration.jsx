import React, {useState} from 'react';
import GeneratedItem from "./GeneratedItem.jsx";
import {useSelector} from "react-redux";

const ItemsGeneration = () => {

    const generatedItems = useSelector(state => state.items.generatedItems)
    console.log(generatedItems)



    return (
        <div className="flex justify-around">
            {generatedItems.map((item, i) => (
                <GeneratedItem
                key={i}
                index={i}
                item={item}
                />
            ))}
        </div>
    );
};

export default ItemsGeneration;
