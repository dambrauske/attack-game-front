import {createSlice} from "@reduxjs/toolkit";

export const gameSlice = createSlice({
        name: "game",
        initialState: {
            player1: {},
            player2: {},
        }, reducers: {
            setPlayer1: (state, action) => {
                state.player1 = action.payload
            },
            setPlayer2: (state, action) => {
                state.player2 = action.payload
            },
        }
    }
)
export const {
    setPlayer1,
    setPlayer2,
} = gameSlice.actions

export default gameSlice.reducer
