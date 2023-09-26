import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Input, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig.js";
import axios from "axios";
import { formatDate } from "../../../utils/formatData.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../../redux/useSlices/genresSlice.js";
import { getAllSong } from "../../../redux/useSlices/songsSlice.js";

export default function FormEdit({ handleCloseEdit, id }) {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres.data);
  const listSong = useSelector((state) => state.songs.data);

  const [editSong, setEditSong] = useState({
    songName: "",
    singer: "",
  });
  const [genresSelect, setGenresSelect] = useState();

  useEffect(() => {
    dispatch(getAllSong());
  }, []);

  const findOneSongById = () => {
    const song = listSong.find((song) => song.id === id);
    setEditSong(song);
  };

  useEffect(() => {
    findOneSongById();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditSong({
      ...editSong,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEditSong = {
      songName: editSong.songName,
      singer: editSong.singer,
      song: editSong.song,
      timingSong: editSong.timingSong,
      genresId: editSong.genresId,
      date: editSong.date,
      listens: 0,
      songImage: editSong.songImage,
    };
    console.log(newEditSong);
    await axios
      .put(`http://localhost:3000/songs/${id}`, newEditSong)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    handleCloseEdit();
    dispatch(getAllSong());
  };

  const handleSelect = (idGenres) => {
    setGenresSelect(idGenres);
  };

  // Tạo một tham chiếu đến thư mục chứa bài hát trên Firebase
  const songListRef = ref(storage, "songs/");
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        // lấy đường dẫn của ảnh sau khi tải lên thành công
        const downloadURL = info.file.response.url;

        // lưu đường dẫn vào state songUpload
        setSongUpload(downloadURL);

        setAudio(new Audio(downloadURL));

        message.success("Tải bài hát lên thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải bài hát lên thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến bài hát trên Firebase Storage
        const songRef = ref(songListRef, file.name);

        // tải bài hát lên firebase storage
        await uploadBytes(songRef, file);

        // lấy URL bài hát sau khi tải lên
        const downloadURL = await getDownloadURL(songRef);
        console.log("downloadURL", downloadURL);

        // Gọi hàm onSuccess với URL để thông báo cho Upload thành công
        onSuccess({ url: downloadURL });
      } catch (error) {
        // Gọi hàm onError để thông báo Upload thất bại
        onError(error);
      }
    },
    progress: {
      strokeColor: {
        "0%...": "#108ee9",
        "...100%": "#87d068",
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  // tạo tham chiếu đến thư mục chứa ảnh trên firebase
  const imageUrlRef = ref(storage, "images/");
  const propsImage = {
    name: "file",
    onChange(info) {
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi tải lên thành công
        const downloadURL = info.file.response.url;

        // Lưu đường dẫn vào state imageUpload
        setImageUrl(downloadURL);

        message.success("Tải ảnh lên thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải ảnh lên thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến ảnh trên Firebase Storage
        const imageRef = ref(imageUrlRef, file.name);

        // Tải ảnh lên Firebase Storage
        await uploadBytes(imageRef, file);

        // Lấy URL của ảnh sau khi tải lên thành công
        const downloadURL = await getDownloadURL(imageRef);

        setImageUrl(downloadURL);
        // Gọi hàm onSuccess với URL để thông báo cho Upload thành công
        onSuccess({ url: downloadURL });
      } catch (error) {
        // Gọi hàm onError để thông báo Upload thất bại
        onError(error);
      }
    },
    // progress: {
    //   strokeColor: {
    //     "0%...": "#108ee9",
    //     "...100%": "#87d068",
    //   },
    //   size: 3,
    //   format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    // },
  };

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  return (
    <>
      <div className="song-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 className="text-center font-semibold text-4xl my-3">
            Cập nhật bài hát
          </h3>
          <div className="mb-3">
            <label className="font-semibold" htmlFor="songName">
              Tên bài hát
            </label>
            <Input
              onChange={handleChange}
              name="songName"
              className="mt-2"
              placeholder="Nhập tên bài hát"
              id="songName"
              value={editSong.songName}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold" htmlFor="singer">
              Ca sĩ
            </label>
            <Input
              onChange={handleChange}
              name="singer"
              className="mt-2"
              id="singer"
              type="text"
              placeholder="Nhập tên ca sĩ"
              value={editSong.singer}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold" htmlFor="genres">
              Thể loại
            </label>
            <div className="mt-2 mb-3">
              <Select
                value={{
                  value: editSong.genresId,
                  label: genres.forEach((element) => {
                    if (element.id == editSong.genresId) return element.name;
                  }),
                }}
                placeholder="Chọn thể loại"
                onChange={handleSelect}
                style={{
                  width: "100%",
                }}
                options={genres.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </div>

            <div className="mb-3">
              <label className="font-semibold" htmlFor="file">
                Image
              </label>
              <div className="mb-3 text-center">
                <Image width={100} src={editSong.songImage} alt="img" />
              </div>
              <div className="text-center mt-2">
                <Upload {...propsImage}>
                  <Button icon={<UploadOutlined />}>Nhập hình ảnh</Button>
                </Upload>
              </div>
            </div>
            <div className="mt-4"></div>
          </div>
          <div className="flex gap-3 items-end justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 p-3 text-white rounded-xl"
            >
              Cập nhật
            </button>
            <button
              onClick={handleCloseEdit}
              type="button"
              className="bg-red-500 p-3 text-white rounded-xl"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
