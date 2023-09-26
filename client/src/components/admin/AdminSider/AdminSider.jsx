import Sider from "antd/es/layout/Sider";
import React from "react";
import { NavLink } from "react-router-dom";

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "dark",
};

export default function AdminSider() {
  return (
    <>
      <Sider className="h-[100vh] " style={siderStyle}>
        <div className="demo-logo-vertical flex text-white text-5xl items-center justify-center gap-2 p-10 ">
          {" "}
          <img
            className="rounded-full"
            width={50}
            height={50}
            src="https://www.3sh.com.au/site/assets/img/social/streaming.jpg"
            alt=""
          />
          Muzik
        </div>
        <div className="mt-10">
          <ul className="">
            <li>
              <NavLink
                to={"list-users"}
                className="text-2xl flex items-center justify-center gap-5 h-20"
              >
                <i className="fa-solid fa-user-group"></i> Quản lí tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"list-songs"}
                className="text-2xl flex items-center pl-11 gap-5 h-20"
              >
                <i className="fa-solid fa-music"></i>Quản lí bài hát
              </NavLink>
            </li>
          </ul>
        </div>
      </Sider>
    </>
  );
}
