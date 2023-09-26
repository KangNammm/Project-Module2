import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Button, Modal, Input } from "antd";
import confirm from "antd/es/modal/confirm";
import "./header.css";
import Slogan from "./../Slogan/Slogan";
import { searchDataSong } from "../../../redux/useSlices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLinkPlaySong } from "../../../redux/useSlices/songsSlice";
import axios from "axios";
import { setPlaySong } from "../../../redux/useSlices/playSongSlice";
import { clearUserInfo } from "../../../redux/useSlices/usersSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allSong = useSelector((state) => state.songs.data);
  // lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));
  const [textSearch, setTextSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);

  const handleLogOut = () => {
    // xóa dữ liệu khỏi local
    dispatch(clearUserInfo());
    dispatch(setPlaySong(false));
    localStorage.removeItem("userLocal");
    navigate("/");
  };

  // hàm xử lí đăng xuất
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      onOk() {
        handleLogOut();
      },
      cancelText: "Hủy bỏ",
      okText: "Xác nhận",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <UserOutlined className="mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/change-password"}>
          <KeyOutlined className="mr-2" />
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link onClick={handleConfirmLogout}>
          <LogoutOutlined className="mr-2" />
          Đăng xuất
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (textSearch) {
      axios
        .get(`http://localhost:3000/songs?songName_like=${textSearch}`)
        .then((res) => {
          if (res.data.length > 0) {
            setResults(res.data);
            setShowResult(true);
          } else {
            setShowResult(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [textSearch]);

  const getSong = (song) => {
    dispatch(setLinkPlaySong(song));
    setResults([]);
    setTextSearch("");
  };

  return (
    <>
      <>
        <nav className="navbar items-center text-center">
          <div className="content">
            <div className="logo flex text-center items-center gap-2">
              <img
                className="rounded-full"
                width={50}
                height={50}
                src="https://www.3sh.com.au/site/assets/img/social/streaming.jpg"
                alt=""
              />
              <Link to="/">Muzik</Link>
            </div>
            <ul className="menu-list flex items-center justify-center relative">
              <li>
                <Input
                  className="h-18 w-[40rem] rounded-full relative "
                  size="large"
                  placeholder="Tìm kiếm bài hát"
                  value={textSearch}
                  onChange={(e) => setTextSearch(e.target.value)}
                />
                {showResult ? (
                  <>
                    <div className="w-[37rem] absolute left-7 bg-white rounded text-start mt-1 max-h-80 overflow-y-auto">
                      {results.map((result) => (
                        <div
                          key={result.id}
                          className="p-2 cursor-pointer hover:bg-slate-200 border-b w-full"
                        >
                          <Link
                            onClick={() => {
                              dispatch(setPlaySong(true));
                              getSong(result.song);
                            }}
                            className="text-2xl p-2 "
                          >
                            {result.songName} - {result.singer}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </li>
              <li>
                {userLogin !== null ? (
                  <>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottom"
                      arrow
                    >
                      <Button className="border-none shadow-none text-white">
                        <div className="flex items-center gap-2">
                          {userLogin.username}
                          <img
                            className="rounded-full"
                            height={25}
                            width={25}
                            src={userLogin.image}
                            alt="Ảnh đại diện"
                          />
                          {userLogin.userName}
                        </div>
                      </Button>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>Đăng nhập</Link>
                  </>
                )}
              </li>
            </ul>

            <div className="icon menu-btn">
              <i className="fas fa-bars" />
            </div>
          </div>
        </nav>
        <div className="banner align-middle pt-40 ">
          <Slogan />
        </div>
      </>
    </>
  );
}
