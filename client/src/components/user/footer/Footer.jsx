import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import PlayPage from "../../../pages/user/playPage/playPage";
import { useDispatch, useSelector } from "react-redux";

export default function Footer({ show }) {
  const dispatch = useDispatch();

  const playSong = useSelector((status) => status.playSong.status);
  return (
    <>
      <section className="contact" id="contact">
        <h2 className="title">Liên hệ với tôi qua</h2>
        <div className="social-media">
          <Link to="https://www.instagram.com" target="_blank">
            <InstagramOutlined
              className="fab fa-instagram"
              style={{ fontSize: 30 }}
            />
          </Link>
          <Link to="https://www.facebook.com" target="_blank">
            <FacebookOutlined
              className="fab fa-facebook"
              style={{ fontSize: 30 }}
            />
          </Link>
          <Link to="https://twitter.com" target="_blank">
            <TwitterOutlined
              className="fab fa-twitter"
              style={{ fontSize: 30 }}
            />
          </Link>
          <Link to="https://www.google.com" target="_blank">
            <GoogleOutlined
              className="fab fa-google"
              style={{ fontSize: 30 }}
            />
          </Link>
        </div>

        {playSong && <PlayPage />}

        <footer className="footer">
          <p>© Design by Kang Nam</p>
          <p>© Email: Namkul.shinobi@gmail.com</p>
        </footer>
      </section>
    </>
  );
}
