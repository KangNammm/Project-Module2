import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../useSlices/usersSlice";
import thunk from 'redux-thunk'
import genresSlice from "../useSlices/genresSlice";
import songsSlice from "../useSlices/songsSlice";
import playSongSlice from './../useSlices/playSongSlice';

export const store = configureStore({
    reducer: {
        user: usersSlice,
        genres: genresSlice,
        songs: songsSlice,
        playSong: playSongSlice,

    },
    middleware: [thunk],
})