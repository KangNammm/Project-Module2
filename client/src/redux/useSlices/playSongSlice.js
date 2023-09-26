import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setPlaySong = createAsyncThunk("setPlaySong", (status) => {
   return status
})

const playSongSlice = createSlice({
    name: "playSong",
    initialState: {
      status: false
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(setPlaySong.fulfilled, (state, action) => {
          state.status = action.payload;
        })
        
    }
})



export default playSongSlice.reducer;