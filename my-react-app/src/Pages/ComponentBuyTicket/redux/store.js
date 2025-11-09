import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './MovieSlice';


let store = configureStore({

reducer: {
    movie : movieReducer,
}




})
export default store;
