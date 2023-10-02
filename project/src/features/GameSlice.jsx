import {createSlice} from "@reduxjs/toolkit";

export const gameSlice = createSlice({
        name: "game",
        initialState: {
            player1: {},
            player2: {},
            userTurn: '',
            lost: '',
            won: ''
        }, reducers: {
            setPlayer1: (state, action) => {
                state.player1 = action.payload
            },
            setLost: (state, action) => {
                state.lost = action.payload
            },
            setWon: (state, action) => {
                state.won = action.payload
            },
            setUserTurn: (state, action) => {
                state.userTurn = action.payload
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
    setUserTurn,
    setWon,
    setLost,
} = gameSlice.actions

export default gameSlice.reducer
