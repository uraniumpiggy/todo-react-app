import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./toDoSlice";

const store = configureStore({
    reducer: toDoSlice
})

export default store