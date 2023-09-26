import { useState } from "react";
import "./assets/styles/main.css";
import Header from "./components/user/header/Header";
import Slide from "./components/user/slider/Slide";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/homePage/Home";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import AdminLayout from "./components/admin/AdminLayout/AdminLayout";
import ListSong from "./pages/admin/listSong/ListSong";
import ListUser from "./pages/admin/listUser/ListUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="list-users" element={<ListUser />} />
          <Route path="list-songs" element={<ListSong />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
