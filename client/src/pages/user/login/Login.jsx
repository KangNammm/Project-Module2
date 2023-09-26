import { Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { auth, provider } from "./../../../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../redux/useSlices/usersSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.data);
  // console.log(listUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  // đăng nhập với google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (response) => {
        const userLocal = {
          email: response.user.email,
          username: response.user.displayName,
          image: response.user.photoURL,
          id: response.user.uid,
          favoriteList: [],
        };

        // Gọi API lấy tất cả user
        const getAllUser = async () => {
          const response = await axios.get("http://localhost:3000/users");
          return response.data;
        };

        // Kiểm tra email của user google có tồn tại trong db?
        const users = await getAllUser();
        const user = users.find((user) => user.email == response.user.email);

        // Nếu có thì đăng nhập luôn
        if (user) {
          // lấy giá trị từ các ô input
          const handleInputChange = (e) => {
            // lấy name và value từ ô input
            const { value, name } = e.target;

            // khi onChange thì gọi đến hàm validate
            validateData(name, value);

            // kiểm tra name và gán lại giá trị
            if (name === "email") {
              setEmail(value);
            } else if (name === "password") {
              setPassword(value);
            } else {
              return;
            }
          };

          const handleSubmit = (e) => {
            e.preventDefault();

            validateData("email", email);
            validateData("password", password);

            if (email && password) {
              const newUser = {
                email: email,
                password: password,
              };
            }
          };

          if (!user.active) {
            notification.error({
              message: "Tài khoản đã bị khóa",
              description:
                "Tài khoản của bạn đã bị khóa, xin vui lòng liên hệ Admin để mở khóa",
            });
            return;
          }
          localStorage.setItem("userLocal", JSON.stringify(user));
          if (user.role == 0) {
            notification.success({
              message: "Đăng nhập thành công",
              description: "Bạn đã đăng nhập tài khoản quản trị viên",
            });
            navigate("/admin/list-users");
          } else {
            notification.success({
              message: "Đăng nhập thành công",
              description: "Bạn đã đăng nhập tài khoản thành công",
            });
            navigate("/");
          }
        }
        // Chưa có tài khoản
        else {
          const res = await axios.post(`http://localhost:3000/users`, {
            username: response.user.displayName,
            email: response.user.email,
            role: 1,
            favoriteList: [],
            image: response.user.photoURL,
            active: false,
            password: "1234567",
          });

          if (res.status == 201) {
            localStorage.setItem("userLocal", JSON.stringify(res.data));
            notification.success({
              message: "Đăng nhập thành công",
              description: "Bạn đã đăng nhập tài khoản thành công",
            });
            navigate("/");
          } else {
            notification.error({
              message: "Chưa có tài khoản",
              description: "Vui lòng tạo tài khoản",
            });
          }
        }
        // nếu không có thì post vào luôn rồi đăng nhập
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // đăng nhập với API
  // hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
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
        } else {
          setPasswordError("");
          return;
        }
        break;
      default:
        break;
    }
  };

  // lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    // lấy name và value từ ô input
    const { value, name } = e.target;

    // khi onChange thì gọi đến hàm validate
    validateData(name, value);

    // kiểm tra name và gán lại giá trị
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateData("email", email);
    validateData("password", password);

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };

      // Kiểm tra email của user google có tồn tại trong db?
      const user = listUser.find((user) => user.email == newUser.email);

      if (
        user &&
        user.email == newUser.email &&
        user.password == newUser.password
      ) {
        localStorage.setItem("userLocal", JSON.stringify(user));
        navigate("/");
      } else {
        notification.error({
          message: "Chưa có tài khoản",
        });
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form className="p-6 rounded w-1/4" onSubmit={handleSubmit}>
          <h3 className="text-center text-3xl mb-2">Đăng nhập</h3>
          <div className="mb-4">
            <label htmlFor="">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              className={`${emailError && "err"} mt-2`}
              placeholder="Nhập email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {emailError && (
              <div className="mt-1 text-red-700">{emailError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="">Mật khẩu</label>
            <Input
              id="password"
              type="password"
              name="password"
              className={`${passwordError && "err"} mt-2`}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {passwordError && (
              <div className="mt-1 text-red-700">{passwordError}</div>
            )}
          </div>
          <div>
            <button
              className="q-btn-primary primary w-full rounded-lg"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Link to="/">Quay lại trang chủ</Link>
            <Link>Quên mật khẩu</Link>
          </div>
          <div className="text-center my-3">
            <span>Hoặc</span>
          </div>
          <div>
            <Button
              className="w-full flex items-center justify-center gap-2 border-pink-400"
              onClick={signInWithGoogle}
            >
              <img
                width={20}
                height={20}
                src="https://th.bing.com/th/id/OIP.IaoQZRzMTYotymEDBMXk1wHaHa?pid=ImgDet&rs=1"
                alt=""
              />
              Đăng nhập với Google
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2">
            Bạn đã có tài khoản ?{" "}
            <Link to="/register" className="ml-2 text-pink-500 ">
              Đăng kí
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
