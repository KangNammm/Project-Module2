import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig.js";
import axios from "axios";
import { formatDate, formatTime } from "../../../utils/formatData.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../../redux/useSlices/genresSlice.js";
import { deleteById, getAllSong } from "../../../redux/useSlices/songsSlice.js";
import FormEdit from "./../formEdit/FormEdit";

export default function ListSong() {
  const dispatch = useDispatch();
  const listSong = useSelector((state) => state.songs.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genres = useSelector((state) => state.genres.data);
  const [genresSelect, setGenresSelect] = useState();
  const [songUpoad, setSongUpload] = useState(null);
  const [songs, setSongs] = useState({
    songName: "",
    singer: "",
    timingSong: "",
  });
  const [audio, setAudio] = useState(new Audio());
  const [audioDuration, setAudioDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [idEdit, setIdEDit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalSongs = listSong.length;
  const totalPages = Math.ceil(totalSongs / pageSize);

  // Tạo mảng sản phẩm cho trang hiện tại
  const currentSongs = listSong.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleCancel();
  };

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllSong());
  }, []);

  // Lắng nghe sự kiện 'loadedmetadata' của audio để lấy thời lượng
  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setAudioDuration(audio.duration);
    });

    return () => {
      // Loại bỏ lắng nghe khi component unmount
      audio.removeEventListener("loadedmetadata", () => {
        setAudioDuration(audio.duration);
      });
    };
  }, [audio]);
  // hàm chọn thể loại
  const handleSelect = (idGenres) => {
    setGenresSelect(idGenres);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSongs({
      ...songs,
      [name]: value,
    });
  };

  const handleShowFormDelete = (id) => {
    setShowModalDelete(true);
    setIdDelete(id);
  };

  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    dispatch(deleteById(idDelete));
    setShowModalDelete(false);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = {
      songName: songs.songName,
      singer: songs.singer,
      song: songUpoad,
      timingSong: audioDuration,
      genresId: genresSelect,
      date: formatDate(new Date()),
      listens: 0,
      songImage: imageUrl,
    };

    axios
      .post(" http://localhost:3000/songs", newSong)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setIsModalOpen(false);
    dispatch(getAllSong());
  };

  const handleCancel = () => {
    setSongs({
      songName: "",
      singer: "",
      timingSong: "",
    });
    setImageUrl("");
    setSongUpload(null);
    setIsModalOpen(false);
  };

  // mở form edit
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setIdEDit(id);
  };

  // đóng form edit
  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  return (
    <>
      {/* Modal confirm */}
      <Modal
        open={showModalDelete}
        title="Bạn có chắc chắn muốn xóa bài hát này?"
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      />

      {/* Form edit */}
      {showEdit && <FormEdit handleCloseEdit={handleCloseEdit} id={idEdit} />}
      <div className="px-14 py-20">
        <Button
          className="add-song-btn m-10"
          type="primary"
          onClick={showModal}
        >
          Thêm bài hát
        </Button>
        <table className="admin-table rounded-xl">
          <thead>
            <tr className="text-start">
              <th>Tên bài hát</th>
              <th>Ca sĩ</th>
              <th>Thời lượng</th>
              <th>Ngày tạo</th>
              {/* <th>Lượt nghe</th> */}
              <th colSpan={2} className="table-action">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSongs.map((song) => (
              <tr key={song.id}>
                <td>{song.songName}</td>
                <td>{song.singer}</td>
                <td>{formatTime(song.timingSong)}</td>
                <td>{song.date}</td>
                {/* <td>{song.listens}</td> */}
                <td className="table-action">
                  <Button
                    type="default"
                    className="border-teal-500"
                    onClick={() => handleShowEdit(song.id)}
                  >
                    Sửa
                  </Button>
                </td>
                <td className="table-action">
                  <Button
                    type="default"
                    className="border-red-400"
                    onClick={() => handleShowFormDelete(song.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="m-10"
          current={currentPage}
          pageSize={pageSize}
          total={totalSongs}
          onChange={handlePageChange}
        />
      </div>
      <div>
        <Modal
          title="Thêm bài hát"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <form
            className="add-song-form w-full p-6 rounded"
            onSubmit={handleSubmit}
          >
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
                value={songs.songName}
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
                value={songs.singer}
              />
            </div>
            <div className="mb-3">
              <label className="font-semibold" htmlFor="genres">
                Thể loại
              </label>
              <div className="mt-2 mb-3">
                <Select
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
                  File
                </label>
                <div className="text-center mt-2">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload bài hát</Button>
                  </Upload>
                </div>
              </div>

              <div className="mb-3">
                <label className="font-semibold" htmlFor="file">
                  Image
                </label>
                <div className="mb-3 text-center">
                  <Image width={100} src={imageUrl} alt="img" />
                </div>
                <div className="text-center mt-2">
                  <Upload {...propsImage}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </div>
              </div>
              <div className="mt-4"></div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
