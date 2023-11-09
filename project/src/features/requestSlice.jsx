import {createSlice} from "@reduxjs/toolkit";

export const requestSlice = createSlice({
        name: "request",
        initialState: {
            sender: undefined,
            receiver: undefined,
            senderMessage: undefined,
        }, reducers: {
            setSender: (state, action) => {
                state.sender = action.payload
            },
            setReceiver: (state, action) => {
                state.receiver = action.payload
            },

            setSenderMessage: (state, action) => {
                state.senderMessage = action.payload
            },

        }
    }
)
export const {
    setSenderMessage,
    setSender,
    setReceiver,
} = requestSlice.actions

export default requestSlice.reducer
