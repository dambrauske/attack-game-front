import {createSlice} from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
        name: "items",
        initialState: {
            generatedItems: [],
            inventory: [],
            showModal: false,
            potion: undefined,
            weapon: undefined,
            armour: undefined,
        }, reducers: {
            setGeneratedItems: (state, action) => {
                if (state.generatedItems.length === 3) {
                    state.generatedItems = []
                }
                state.generatedItems.push(action.payload)
            },
            clearGeneratedItems: (state) => {
                state.generatedItems = []
            },
            removeFromGeneratedItems: (state, action) => {
                const itemNameToRemove = action.payload.name;
                state.generatedItems = state.generatedItems.filter(item => item.name !== itemNameToRemove)
            },
            getInventory: (state, action) => {
                state.inventory = action.payload
            },
            setShowModal: (state, action) => {
                state.showModal = action.payload
            },
            setPotion: (state, action) => {
                state.potion = action.payload
            },
            setWeapon: (state, action) => {
                state.weapon = action.payload
            },
            setArmour: (state, action) => {
                state.armour = action.payload
            },


        }
    }
)
export const {
    setGeneratedItems,
    getInventory,
    setShowModal,
    removeFromGeneratedItems,
    clearGeneratedItems,
    setPotion,
    setWeapon,
    setArmour,
} = itemsSlice.actions

export default itemsSlice.reducer
