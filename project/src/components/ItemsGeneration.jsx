import React, {useState} from 'react';
import GeneratedItem from "./GeneratedItem.jsx";
import {useSelector} from "react-redux";
import Modal from "./Modal.jsx";
import EmptyItemSlot from "./EmptyItemSlot.jsx";

const ItemsGeneration = () => {

    const generatedItems = useSelector(state => state.items.generatedItems)
    console.log('generatedItems', generatedItems)


    return (

        <div className="w-full min-h-[8rem]">


            {generatedItems.length > 0 &&

                <div className="flex w-2/3  gap-4 justify-center">

                    {generatedItems.map((item, i) => (
                        <GeneratedItem
                            key={i}
                            index={i}
                            item={item}
                        />
                    ))}
                </div>
            }


        </div>

    )
        ;
};

export default ItemsGeneration;
