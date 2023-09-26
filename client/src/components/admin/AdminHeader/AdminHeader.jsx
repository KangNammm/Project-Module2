import { KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const headerStyle = {
  textAlign: "center",
  color: "#000000",
  height: 85,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#D7D7D7",
};

export default function AdminHeader() {
  const navigate = useNavigate();
  // lấy thông tin user đã đăng nhập
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));

  const handleLogOut = () => {
    // xóa dữ liệu khỏi local
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

  return (
    <>
      <Header style={headerStyle}>
        <div className="pt-5 flex items-center justify-end">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <Button className="border-none shadow-none text-white">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full"
                  height={40}
                  width={40}
                  src="https://hst.mit.edu/sites/default/files/styles/square_medium_250x250/public/profiles/093e362c-4367-4c91-a874-95170c56cd80.jpg?h=8a156595&itok=z4kwl7co"
                  alt="Ảnh đại diện"
                />
              </div>
            </Button>
          </Dropdown>
        </div>
      </Header>
    </>
  );
}
