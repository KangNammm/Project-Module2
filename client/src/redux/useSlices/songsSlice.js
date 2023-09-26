import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";


// gọi API lấy thông tin song
export const getAllSong = createAsyncThunk('song/getAllSong', async () => {
  try {
    const response = await axios.get(`http://localhost:3000/songs`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
})

// Gọi API xóa thông tin một bài hát theo id
export const deleteById = createAsyncThunk(
  "delete/deleteById",
  async (songId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/songs/${songId}`);
      if (res.status == 200) {
        notification.success({
          message: "Xóa bài hát",
          description: "Bạn đã xóa bài hát thành công"
        })
      }

      return songId;
    } catch (error) {
      console.log(error);
    }
  }
);

// gọi API cập nhật thông tin bài hát
export const updateSong = createAsyncThunk("song/updateSong", async (song) => {
  const {id, ...data} = song
  try {
    const res = await axios.put(`http://localhost:3000/songs/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// set phat bai hat
export const setLinkPlaySong = createAsyncThunk("song/setLinkPlaySong", async (link) => {
  return link
})

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        data: [],
        linkPlaySong: "",
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // add
        .addCase(getAllSong.pending, (state) => {
          state.status = "Loading"; // chờ
        })
        .addCase(getAllSong.fulfilled, (state, action) => {
          state.status = "Success"; // thành công
          state.data = action.payload; // dữ liệu trả về
        })
        .addCase(getAllSong.rejected, (state, action) => {
          state.status = "Failed"; // thất bại
          state.error = action.error.message; // nội dung lỗi
        })
        .addCase(deleteById.fulfilled, (state, action) => {
          state.data = state.data.filter(
            (song) => song.id !== action.payload
          );
        })
        .addCase(updateSong.fulfilled, (state, action) => {
          [state.data, action.payload];
        })
        .addCase(setLinkPlaySong.fulfilled, (state, action) => {
        state.linkPlaySong = action.payload
      })
    }
})

export default songsSlice.reducer;