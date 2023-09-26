import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import "./allsong.css";
import { HeartOutlined } from "@ant-design/icons";
import {
  getAllSong,
  setLinkPlaySong,
} from "../../../redux/useSlices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "./../../../utils/formatData";
import { getAllUser } from "../../../redux/useSlices/usersSlice";
import axios from "axios";
import { setPlaySong } from "../../../redux/useSlices/playSongSlice";
// import { favoriteList } from "../../../redux/useSlices/usersSlice";

export default function AllSong() {
  const dispatch = useDispatch();
  const allSong = useSelector((state) => state.songs.data);
  const userLocal = JSON.parse(localStorage.getItem("userLocal")) || {};
  const [listFavorite, setListFavorite] = useState([]);

  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(getAllSong());
  }, []);

  const getListFavorite = async () => {
    if (!userLocal.id) {
      setListFavorite([]);
    }

    const resUser = await axios.get(
      `http://localhost:3000/users/${userLocal.id}`
    );
    setListFavorite(resUser.data.favoriteList);
  };

  useEffect(() => {
    getListFavorite();
  }, [userData]);

  const handleFavorite = async (songInfo) => {
    if (!userLocal.id) {
      notification.error({
        message: "Ban chua dang nhap",
        description: "Ban chua dang nhap",
      });
    } else {
      const res = await axios.get(
        `http://localhost:3000/users/${userLocal.id}`
      );
      const userLoginDB = res.data;
      const favoriteList = userLoginDB.favoriteList;
      const index = favoriteList.findIndex((song) => song.id == songInfo.id);
      if (index == -1) {
        favoriteList.push(songInfo);
      } else {
        favoriteList.splice(index, 1);
      }
      await axios.patch(`http://localhost:3000/users/${userLocal.id}`, {
        favoriteList,
      });

      const resUser = await axios.get(
        `http://localhost:3000/users/${userLocal.id}`
      );
      setListFavorite(resUser.data.favoriteList);
    }
  };

  return (
    <>
      <div className="allsong pb-10">
        <h3 className="text-6xl p-[4rem]">Tất cả ca khúc !!!</h3>
        <div className="  items-center justify-items-center grid grid-cols-4 gap-3">
          {allSong.map((song) => {
            const songFind = listFavorite.find((so) => so.id == song.id);

            return (
              <div
                className="card border shadow-2xl mb-3 rounded-lg "
                style={{ width: "29rem" }}
                key={song.id}
              >
                <img
                  src={song.songImage}
                  className="card-img-top"
                  style={{ width: "100%", height: "180px" }}
                />
                <div className="card-body p-5">
                  <h5 className="card-title text-center ">{song.songName}</h5>
                  <h5 className="card-title text-center ">{song.singer}</h5>
                  <div className="flex items-center justify-center gap-5 mt-3">
                    <i
                      className={`fa-solid fa-heart w-10 h-10 text-4xl  text-cyan-200 border-red-500 hover:text-pink-400 ${
                        songFind ? "text-red-500" : ""
                      }`}
                      onClick={() => handleFavorite(song)}
                    ></i>
                    <Button
                      type="button"
                      className="btn btn- border border-cyan-200 rounded-lg hover:bg-cyan-200 flex gap-1"
                      style={{ marginLeft: 0 }}
                      onClick={() => {
                        dispatch(setPlaySong(true));
                        dispatch(setLinkPlaySong(song.song));
                      }}
                    >
                      Play
                      <span className="badge badge-light">
                        {formatTime(song.timingSong)}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
