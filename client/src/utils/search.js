import axios from "axios";

const response = axios.get(`http://localhost:3000/songs?songName_like=${text}`);