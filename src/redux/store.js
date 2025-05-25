import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from './slice/teamsSlice'

    let store = configureStore({
        reducer : {
            teams: teamsReducer,
        },
    });

export default store;