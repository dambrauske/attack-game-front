import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem('token')
const username = localStorage.getItem('username')
const image = localStorage.getItem('image')
const money = localStorage.getItem('money')
export const userSlice = createSlice({
        name: "user",
        initialState: {
            username,
            image,
            money,
            token,
            images: [],
        }, reducers: {
            setToken: (state, action) => {
                state.token = action.payload
                localStorage.setItem('token', state.token)
            },
            setUsername: (state, action) => {
                state.username = action.payload
                localStorage.setItem('username', state.username)
            },
            setMoney: (state, action) => {
                state.money = action.payload
                localStorage.setItem('money', state.money)
            },
            setUserImage: (state, action) => {
                state.image = action.payload
                localStorage.setItem('image', state.image)
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
    setMoney,
    setUserImage,
    setImages,
} = userSlice.actions

export default userSlice.reducer
