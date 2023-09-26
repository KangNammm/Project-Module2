import axios from "axios";

export const allData = axios.create({
  baseURL: "http://localhost:3000",
})

export const searchDataSong = async (text) => {
  return await axios.get(`http://localhost:3000/songs?songName_like=${text}`);
}
  