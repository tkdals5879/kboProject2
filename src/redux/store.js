import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from './slice/teamsSlice'
import teamRankReducer from './slice/teamRankSlice'

    let store = configureStore({
        reducer : {
            teams: teamsReducer,
            teamRank : teamRankReducer
        },
    });

export default store;