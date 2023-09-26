import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// gọi API lấy thông tin tất cả users
export const getAllUser = createAsyncThunk('user/getAllUser', async () => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

// goi api cap nhat thong tin cua mot user nao day
export const updateRoleUser = createAsyncThunk('user/updateRoleUser', async (infoUser) => {
    await axios.patch(`http://localhost:3000/users/${infoUser.id}`, {active: !infoUser.active})
    return id
})

export const clearUserInfo = createAsyncThunk("user/clearUserInfo", () => {
    return 
})


const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // add
            .addCase(getAllUser.pending, (state) => {
                state.status = "Loading"; // chờ
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.status = "Success"; // thành công
                state.data = action.payload; // dữ liệu trả về
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.status = "Failed"; // thất bại
                state.error = action.error.message; // nội dung lỗi
            })
            // update role, active
            .addCase(updateRoleUser.pending, (state) => {
                state.status = "Loading"; // chờ
            })
            .addCase(updateRoleUser.fulfilled, (state) => {
                state.status = "Success"; // thành công
            })
            .addCase(updateRoleUser.rejected, (state, action) => {
                state.status = "Failed"; // thất bại
                state.error = action.error.message; // nội dung lỗi
            })
            .addCase(clearUserInfo.fulfilled, (state) => {
                state.data = []
            })
    },
});

export default usersSlice.reducer;