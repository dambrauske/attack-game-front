import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ImageCard from "./ImageCard.jsx";
import {setUserImage} from "../features/userSlice.jsx";

const Images = () => {

    const dispatch = useDispatch()

    const images = useSelector(state => state.user.images)
    const selectedImage = useSelector(state => state.user.image)

    console.log(images)
    const selectImage = (index) => {
        console.log('cell clicked')
        if (images[index].username === '') {
            dispatch(setUserImage(images[index].image))
        } else {
            console.log('character already occupied')
        }
    }
    console.log('selectedImage', selectedImage)

    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {images.map((image, i) => (
                <ImageCard
                    index={i}
                    onClick={() => selectImage(i)}
                    image={image.image}
                    key={i}/>
            ))}


        </div>
    );
};

export default Images;
