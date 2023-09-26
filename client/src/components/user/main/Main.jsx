import React from "react";
import Slider from "./../slider/Slide";
import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import NewSong from "../../../pages/user/newsong/NewSong";
import PlayPage from "../../../pages/user/playPage/playPage";
import AllSong from "../../../pages/user/allSongs/AllSong";
import MoodSong from "../../../pages/user/moodSong/MoodSong";

export default function Main() {
  return (
    <>
      <Slider />
      <div>
        <div>
          <MoodSong />
        </div>
        <div>
          <NewSong />
        </div>
      </div>
      <div>
      <AllSong/>
      </div>
    </>
  );
}
