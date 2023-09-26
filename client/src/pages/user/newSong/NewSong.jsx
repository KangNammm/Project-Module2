import React, { useEffect } from "react";
import "./newsong.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSong,
  setLinkPlaySong,
} from "../../../redux/useSlices/songsSlice";
import { setPlaySong } from "../../../redux/useSlices/playSongSlice";

export default function NewSong() {
  const dispatch = useDispatch();
  const listSong = useSelector((state) => state.songs.data);

  useEffect(() => {
    dispatch(getAllSong());
  }, []);

  const newSong = listSong.filter((song) => song.genresId == 1);

  return (
    <>
      {/* New Song */}
      <section className="songs" id="songs">
        <div className="container">
          <div className="songs-header mb-8">
            <h2 className="title">Mới phát hành !!</h2>
          </div>
          <div className="list-new-songs w-full grid grid-cols-3 gap-16 ">
            {newSong.map((song) => (
              <div
                className="new-songs flex gap-3 items-center rounded-lg hover:bg-rgba-0.3"
                key={song.id}
              >
                <div className="w-3/6 relative flex justify-center items-center cursor-pointer group">
                  <img
                    className="new-songs-image rounded-lg w-full hover:bg-rgba-0.3"
                    src={song.songImage}
                    alt=""
                  />
                  <PlayCircleOutlined
                    onClick={() => {
                      dispatch(setPlaySong(true));
                      dispatch(setLinkPlaySong(song.song));
                    }}
                    className="text-6xl absolute text-white hidden group-hover:block"
                  />
                </div>

                <div>
                  <span className="font-bold">{song.songName}</span>
                  <p className="font-normal text-xl">{song.singer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
