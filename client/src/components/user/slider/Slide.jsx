import React from "react";
import { Carousel } from "antd";

export default function Slider() {
  const contentStyle = {
    height: "80vh",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: " #eca7a6",
  };

  return (
    <>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <img
              className="w-full"
              src="https://rare-gallery.com/uploads/posts/340229-Digital-Art-Chill-Chilling-Night-Coffee-Apartment.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img
              className="w-full"
              src="https://www.xtrafondos.com/wallpapers/chica-y-gato-durmiendo-en-la-tarde-lofi-art-6341.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img
              className="w-full"
              src="https://mocah.org/uploads/posts/340019-Lofi-Chillhop-Raccoon-Night-Camping-Bonfire-Digital-Art.jpg"
              alt=""
            />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img
              className="w-full"
              src="https://mocah.org/uploads/posts/342298-Digital-Art-Lofi-Girls-Cat-Headphone-Sleeping-Hip-Hop.jpg"
              alt=""
            />
          </div>
        </div>
      </Carousel>
    </>
  );
}
