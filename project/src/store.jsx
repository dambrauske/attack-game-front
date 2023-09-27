import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice.jsx";
import itemsSliceReducer from "./features/itemsSlice.jsx";


export default configureStore({
    reducer: {
        user: userSliceReducer,
        items: itemsSliceReducer,
    }
})
