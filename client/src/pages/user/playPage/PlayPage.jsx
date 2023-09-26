import React, { useEffect, useRef, useState } from "react";
import "./playpage.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSong,
  setLinkPlaySong,
} from "../../../redux/useSlices/songsSlice";
import { CloseCircleOutlined } from "@ant-design/icons";
import { setPlaySong } from "../../../redux/useSlices/playSongSlice";

export default function PlayPage({ closeSong }) {
  const dispatch = useDispatch();
  const audioPlayerRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const allSong = useSelector((state) => state.songs.data);
  const newAllSong = allSong.map((s) => s.song);
  const linkPlaySong = useSelector((state) => state.songs.linkPlaySong);
  const [dataSongPlay, setDataSongPlay] = useState({});

  useEffect(() => {
    dispatch(getAllSong());
  }, []);

  useEffect(() => {
    const songFind = allSong.find((item) => item.song == linkPlaySong);
    if (songFind) {
      setDataSongPlay(songFind);
    }
  }, [linkPlaySong, allSong]);

  const handleNextClick = async () => {
    if (currentTrackIndex < newAllSong.length - 1) {
      await setCurrentTrackIndex(currentTrackIndex + 1);
      const newLinkPlaySong = newAllSong[currentTrackIndex + 1];
      dispatch(setLinkPlaySong(newLinkPlaySong));
      audioPlayerRef.current.audio.current.src =
        newAllSong[currentTrackIndex + 1];
      audioPlayerRef.current.audio.current.play();
    }
  };

  const handlePreviousClick = async () => {
    if (currentTrackIndex > 0) {
      await setCurrentTrackIndex(currentTrackIndex - 1);
      const newLinkPlaySong = newAllSong[currentTrackIndex + 1];
      dispatch(setLinkPlaySong(newLinkPlaySong));
      audioPlayerRef.current.audio.current.src =
        newAllSong[currentTrackIndex - 1];
      audioPlayerRef.current.audio.current.play();
    }
  };

  return (
    <>
      <CloseCircleOutlined
        className="fixed  right-10 text-5xl "
        style={{ zIndex: 100, bottom: 93, color: "rgba(0,0,0,0.7)" }}
        onClick={() => dispatch(setPlaySong(false))}
      />
      <div className=" relative h-[15rem] flex flex-col items-center justify-center">
        <AudioPlayer
          className=" play-song w-full z-40"
          ref={audioPlayerRef}
          src={linkPlaySong}
          showFilledVolume={true}
          control={true}
          autoPlay
          volume={0.5}
          showSkipControls={true}
          showJumpControls={false}
          onClickPrevious={(e) => handlePreviousClick(e)}
          onClickNext={(e) => handleNextClick(e)}
        />
        <div className="flex items-center gap-6 fixed bottom-[63px] z-50 left-8 ">
          <img className="h-32 w-32 rounded-md" src={dataSongPlay?.songImage} />
          <div className="flex flex-col">
            <marquee>{dataSongPlay?.songName}</marquee>
            <div>{dataSongPlay?.singer}</div>
          </div>
        </div>
      </div>
    </>
  );
}
