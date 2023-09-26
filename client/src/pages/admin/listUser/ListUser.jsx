import { Button, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  updateRoleUser,
} from "../../../redux/useSlices/usersSlice";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
  
export default function ListUser() {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [infoUserUpdate, setInfoUserUpdate] = useState({});

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleChange = (option) => {
    setInfoUserUpdate((prev) => ({
      ...prev,
      role: option,
    }));
  };

  // hiện form thay đổi phân quyền
  const showEditModal = async (iuser) => {
    const user = listUser.find((people) => people.id === iuser.id);
    await setInfoUserUpdate((prev) => ({
      ...prev,
      id: user.id,
      role: user.role,
    }));
    await setUser(user);
    await setIsModalOpen(true);
  };

  const handleOk = async () => {
    dispatch(updateRoleUser(infoUserUpdate));
    dispatch(getAllUser());
    setIsModalOpen(false);
  };

  const handleCancel = (id) => {
    setInfoUserUpdate({});
    setIsModalOpen(false);
  };

  const handleChangeActive = async (infoUser) => {
    dispatch(updateRoleUser(infoUser));
    dispatch(getAllUser());
  };

  return (
    <>
      <div className="px-14 py-20">
        <table className="admin-table rounded-xl">
          <thead>
            <tr className="text-start">
              <th>Email</th>
              <th>Phân quyền</th>
              <th>Trạng thái</th>
              <th colSpan={2} className="table-action">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((userz) => (
              <tr key={userz.id}>
                <td>{userz.email}</td>
                <td>{userz.role === 0 ? "Quản trị viên" : "Người dùng"}</td>
                <td>
                  {userz.active == true ? (
                    <Button
                      type="dashed"
                      className="flex items-center border-sky-500 text-sky-500"
                    >
                      <UnlockOutlined /> Đang hoạt động
                    </Button>
                  ) : (
                    <Button className="flex items-center" type="dashed" danger>
                      <LockOutlined /> Đang bị khóa
                    </Button>
                  )}
                </td>
                <td className="table-action">
                  <Button
                    onClick={() => showEditModal(userz)}
                    type="default"
                    className="border-teal-500"
                  >
                    Sửa
                  </Button>
                </td>
                <td className="table-action">
                  {userz.active == true ? (
                    <>
                      <Button
                        type="default"
                        className="border-red-400"
                        onClick={() => handleChangeActive(userz)}
                      >
                        Khóa
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="dashed"
                        className="border-teal-500"
                        onClick={() => handleChangeActive(userz)}
                      >
                        Mở khóa
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Modal sửa quyền truy cập */}
        <Modal
          title="Thay đổi phân quyền"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            placeholder="Chọn phân quyền"
            value={infoUserUpdate.role}
            onChange={handleChange}
            style={{
              width: "100%",
            }}
            options={[
              {
                value: 1,
                label: "Người dùng",
              },
              {
                value: 0,
                label: "Quản trị viên",
              },
            ]}
          />
        </Modal>
      </div>
    </>
  );
}
