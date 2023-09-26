import React, { useEffect } from "react";
import "./moodsong.css";
import { Carousel } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSong,
  setLinkPlaySong,
} from "../../../redux/useSlices/songsSlice";
import { setPlaySong } from "../../../redux/useSlices/playSongSlice";

export default function MoodSong() {
  const dispatch = useDispatch();
  const listSong = useSelector((state) => state.songs.data);

  useEffect(() => {
    dispatch(getAllSong());
  }, []);

  const moodSong = listSong.filter((song) => song.genresId == 2);

  return (
    <>
      <>
        {/* Mood songs */}
        <section className="play" id="play">
          <div className="container">
            <div>
              <div className="child-page-listing">
                <h2 className="text-6xl mb-[4rem]">
                  Nghe nhạc vào một chiều mưa
                  <i className="fa-solid fa-cloud-rain text-gray-700 ml-5"></i>
                </h2>
                <div className="grid-container">
                  {moodSong.map((song) => (
                    <article className="location-listing" key={song.id}>
                      <div className="location-title flex flex-col">
                        <div className="flex items-center justify-center gap-[4rem]">
                          <i className="fa-solid fa-heart text-4xl "></i>
                          <PlayCircleOutlined
                            onClick={() => {
                              dispatch(setPlaySong(true));
                              dispatch(setLinkPlaySong(song.song));
                            }}
                            className="text-7xl"
                          />
                          <i className="fa-solid fa-ellipsis text-5xl"></i>
                        </div>
                        <div className="text-center">{song.songName}</div>
                      </div>
                      <div className="location-image">
                        <div>
                          <img src={song.songImage} alt="" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {/* end grid container */}
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
