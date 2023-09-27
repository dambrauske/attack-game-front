import React, {useState} from 'react';
import Modal from "./Modal.jsx";

const GeneratedItem = ({item}) => {

    const [showModal, setShowModal] = useState(false);

    const showModalOnHover = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
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

            <div className="bg-slate-100 rounded h-28 w-28">
                <img className="w-full h-full object-contain" src={item.image} alt=""/>
            </div>
            <button className="bg-slate-300 px-6 py-1">Take</button>
        </div>
    );
};

export default GeneratedItem;
