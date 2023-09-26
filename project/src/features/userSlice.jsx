import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem('token')
export const userSlice = createSlice({
        name: "user",
        initialState: {
            username: '',
            image: '',
            token,
            images: [],
        }, reducers: {
            setToken: (state, action) => {
                state.token = action.payload
                localStorage.setItem('token', state.token)
            },
            setUsername: (state, action) => {
                state.username = action.payload
            },
            setUserImage: (state, action) => {
                state.image = action.payload
            },
            setImages: (state, action) => {
                state.images = action.payload
            },

        }
    }
)
export const {
    setToken,
    setUsername,
    setUserImage,
    setImages,
} = userSlice.actions

export default userSlice.reducer
