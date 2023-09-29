import React, {useState} from 'react';
import Modal from "./Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getInventory, removeFromGeneratedItems} from "../features/itemsSlice.jsx";

const GeneratedItem = ({item}) => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);

    const showModalOnHover = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }

    const takeToInventory = (item) => {

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({item})
        }

        fetch('http://localhost:8000/addToInventory', options)
            .then(res => res.json())
            .then(data => {
                console.log('inventory from back when added new', data.data)
                dispatch(removeFromGeneratedItems(item))
                dispatch(getInventory(data.data))
            })

        const options2 = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem('token')
            },
            body: null
        }

        fetch('http://localhost:8000/getInventory', options2)
            .then(res => res.json())
            .then(data => {
                console.log('inventory from back', data.data)
                dispatch(getInventory(data.data))
            })
    }

    return (
        <div
            onMouseEnter={showModalOnHover}
            onMouseLeave={hideModal}
            className=" flex flex-col items-center justify-center gap-2 relative">
            {
                showModal &&
                <Modal
                    item={item}
                />
            }

            <div className="rounded h-28 w-28 bg-indigo-200 relative hover:bg-indigo-100">
                <img className="w-full h-full object-contain" src={item.image} alt=""/>
            </div>
            <button
                onClick={() => takeToInventory(item)}
                className="bg-green-300 px-6 absolute bottom-0 bg-opacity-70 rounded"
            >Take
            </button>
        </div>
    );
};

export default GeneratedItem;

