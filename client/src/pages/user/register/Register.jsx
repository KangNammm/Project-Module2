import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import { Input } from "antd";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "username":
        if (!valueInput) {
          setUsernameError("Tên tài khoản không được để trống");
          return;
        } else {
          setUsernameError("");
          return;
        }

      case "email":
        if (!valueInput) {
          setEmailError("Email không được để trống");
          return;
        } else {
          setEmailError("");
          return;
        }

      case "password":
        if (!valueInput) {
          setPasswordError("Mật khẩu không được để trống");
          return;
        } else if (valueInput.length < 5) {
          setPasswordError("Password tối thiểu 5 ký tự");
        } else {
          setPasswordError("");
          return;
        }

      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Mật khẩu xác nhận không được để trống");
          return;
        } else if (valueInput !== user.password) {
          setConfirmPasswordError("Mật khẩu không khớp");
          return;
        } else {
          setConfirmPasswordError(false);
        }
        break;
      default:
        break;
    }
  };

  // lấy dữ liệu từ ô input
  const handleChange = (e) => {
    // lấy name và value từ ô input
    const { value, name } = e.target;

    // khi onChange thì gọi đến hàm validate
    validateData(name, value);

    setUser({ ...user, [name]: value });
  };

  // hàm submit
  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("username", user.username);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);

    if (user.username && user.email && user.password && user.confirmPassword) {
      const newUser = {
        username,
        password,
        email,
        role: 1,
        favoriteList: [],
        image:
          "https://www.kind.com/globalassets/bilder---2880-x-2880/icons/personen_icon_male.png?w=2880&h=2880&mode=crop&anchor=topleft",
        active: true,
      };
      console.log(newUser);
    }
    // axios
    //   .post(" http://localhost:3000/users", newUser)
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form className="p-6 rounded w-1/4" onSubmit={handleSubmit}>
          <h3 className="text-center text-3xl mb-2">Tạo tài khoản</h3>
          <div className="mb-4">
            <label htmlFor="username">Tên tài khoản</label>
            <Input
              id="username"
              className={`${usernameError && "err"} mt-2`}
              placeholder="Nhập tên tài khoản"
              name="username"
              onChange={handleChange}
            />
            {usernameError && (
              <div className="mt-1 text-red-700">{usernameError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              className={`${emailError && "err"} mt-2`}
              placeholder="Nhập email"
              name="email"
              onChange={handleChange}
            />
            {emailError && (
              <div className="mt-1 text-red-700">{emailError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Mật khẩu</label>
            <Input
              id="password"
              type="password"
              className={`${passwordError && "err"} mt-2`}
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={handleChange}
            />
            {passwordError && (
              <div className="mt-1 text-red-700">{passwordError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <Input
              id="confirmPassword"
              type="password"
              className={`${confirmPasswordError && "err"} mt-2`}
              placeholder="Nhập mật khẩu xác nhận"
              name="confirmPassword"
              onChange={handleChange}
            />
            {confirmPasswordError && (
              <div className="mt-1 text-red-700">{confirmPasswordError}</div>
            )}
          </div>
          <div>
            <button
              className="q-btn-primary primary w-full rounded-lg"
              type="submit"
            >
              Đăng kí
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link to="/login">Đăng nhập</Link>
            <Link>Quên mật khẩu</Link>
          </div>
        </form>
      </div>
    </>
  );
}
