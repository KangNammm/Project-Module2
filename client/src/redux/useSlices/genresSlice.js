import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// gọi API lấy thông tin genres
export const getAllGenres = createAsyncThunk('genres/getAllGenres', async () => {
    const response = await axios.get('http://localhost:3000/genres');
    return response.data;
})

const genresSlice = createSlice({
    name: "genres",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
         // add
            .addCase(getAllGenres.pending, (state) => {
                state.status = "Loading"; // chờ
            })
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.status = "Success"; // thành công
                state.data = action.payload; // dữ liệu trả về
            })
            .addCase(getAllGenres.rejected, (state, action) => {
                state.status = "Failed"; // thất bại
                state.error = action.error.message; // nội dung lỗi
            })
    }
})

export default genresSlice.reducer;