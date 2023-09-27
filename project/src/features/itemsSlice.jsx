import {createSlice} from "@reduxjs/toolkit";

// const token = localStorage.getItem('token')
export const itemsSlice = createSlice({
        name: "items",
        initialState: {
            generatedItems: [],
        }, reducers: {
            setGeneratedItems: (state, action) => {
                if (state.generatedItems.length === 3) {
                    state.generatedItems = []
                }
                state.generatedItems.push(action.payload)
            },

        }
    }
)
export const {
    setGeneratedItems,
} = itemsSlice.actions

export default itemsSlice.reducer
