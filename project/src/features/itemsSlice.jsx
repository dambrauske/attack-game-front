import {createSlice} from "@reduxjs/toolkit";

const inventory = localStorage.getItem('inventory')
const fightEquipment = localStorage.getItem('fightEquipment')
const weapon = localStorage.getItem('weapon')
const potion = localStorage.getItem('potion')
const armour = localStorage.getItem('armour')

export const itemsSlice = createSlice({
        name: "items",
        initialState: {
            generatedItems: [],
            itemsGenerationPrice: 100,
            inventory: inventory ? JSON.parse(inventory) : [],
            fightEquipment: fightEquipment ? JSON.parse(fightEquipment) : [],
            showModal: false,
            potion: potion ? JSON.parse(potion) : undefined,
            weapon: weapon ? JSON.parse(weapon) : undefined,
            armour: armour ? JSON.parse(armour) : undefined,
        }, reducers: {
            setGeneratedItems: (state, action) => {
                if (state.generatedItems.length === 3) {
                    state.generatedItems = []
                }
                state.generatedItems = action.payload
            },
            clearGeneratedItems: (state) => {
                state.generatedItems = []
            },
            removeFromGeneratedItems: (state, action) => {
                const itemNameToRemove = action.payload.name;
                state.generatedItems = state.generatedItems.filter(item => item.name !== itemNameToRemove)
            },
            setInventory: (state, action) => {
                state.inventory = action.payload
                localStorage.setItem('inventory', JSON.stringify(state.inventory))

            },
            setFightEquipment: (state, action) => {
                state.fightEquipment = action.payload
                localStorage.setItem('fightEquipment', JSON.stringify(state.fightEquipment))
            },
            setShowModal: (state, action) => {
                state.showModal = action.payload
            },
            setPotion: (state, action) => {
                state.potion = action.payload
                localStorage.setItem('potion', JSON.stringify(state.potion))
            },
            setWeapon: (state, action) => {
                state.weapon = action.payload
                localStorage.setItem('weapon', JSON.stringify(state.weapon))
            },
            setArmour: (state, action) => {
                state.armour = action.payload
                localStorage.setItem('armour', JSON.stringify(state.armour))
            },

        }
    }
)
export const {
    setGeneratedItems,
    setInventory,
    setShowModal,
    removeFromGeneratedItems,
    clearGeneratedItems,
    setPotion,
    setWeapon,
    setArmour,
    setFightEquipment,
} = itemsSlice.actions

export default itemsSlice.reducer
