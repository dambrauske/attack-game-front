import {createSlice} from "@reduxjs/toolkit";

export const requestSlice = createSlice({
        name: "request",
        initialState: {
            sender: undefined,
            receiver: undefined,
            senderSocketId: undefined,
            senderMessage: undefined,
        }, reducers: {
            setSenderUsername: (state, action) => {
                state.sender = action.payload
            },
            setReceiverUsername: (state, action) => {
                state.receiver = action.payload
            },
            setSenderSocketId: (state, action) => {
                state.senderSocketId = action.payload
            },
            setSenderMessage: (state, action) => {
                state.senderMessage = action.payload
            },

        }
    }
)
export const {
    setSenderMessage,
    setSenderSocketId,
    setSenderUsername,
    setReceiverUsername,
} = requestSlice.actions

export default requestSlice.reducer
