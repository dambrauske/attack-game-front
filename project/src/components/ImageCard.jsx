import React from 'react';
import {useSelector} from "react-redux";

const ImageCard = ({image, onClick}) => {

    const selectedImage = useSelector(state => state.user.image)

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer w-32 h-32 ${selectedImage === image? 'border-8 border-indigo-800' : ''}`}>
            <img
                className="w-full h-full object-cover"
                src={image} alt=""/>

        </div>
    );
};

export default ImageCard;
