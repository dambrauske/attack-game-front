import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice.jsx";
import itemsSliceReducer from "./features/itemsSlice.jsx";
import requestSliceReducer from "./features/requestSlice.jsx";
import gameSliceReducer from "./features/gameSlice.jsx";


export default configureStore({
    reducer: {
        user: userSliceReducer,
        items: itemsSliceReducer,
        request: requestSliceReducer,
        game: gameSliceReducer,
    }
})
