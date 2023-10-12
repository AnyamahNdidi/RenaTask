import { configureStore } from "@reduxjs/toolkit"

import myReducer from "./reduxstate"

export const store = configureStore({
    reducer : {myReducer}
})