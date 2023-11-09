import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem('token')
const username = localStorage.getItem('username')
const userId = localStorage.getItem('userId')
const image = localStorage.getItem('image')
const money = localStorage.getItem('money')
export const userSlice = createSlice({
        name: "user",
        initialState: {
            username,
            userId,
            image: image ? image : undefined,
            money,
            token,
            images: [],
            loggedInUsers: [],
            modal: false,
        }, reducers: {
            setToken: (state, action) => {
                state.token = action.payload
                localStorage.setItem('token', state.token)
            },
            setUsername: (state, action) => {
                state.username = action.payload
                localStorage.setItem('username', state.username)
            },
            setUserId: (state, action) => {
                state.userId = action.payload
                localStorage.setItem('userId', state.userId)
            },
            setLoggedInUsers: (state, action) => {
                state.loggedInUsers = action.payload
            },
            clearLoggedInUsers: (state) => {
                state.loggedInUsers = []
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
            setModal: (state, action) => {
                state.modal = action.payload
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
    setLoggedInUsers,
    setModal,
    clearLoggedInUsers,
    setUserId,
} = userSlice.actions

export default userSlice.reducer
