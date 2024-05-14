import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WrapHCenter } from ".";

export default function CustomCarousel(props) {
  const { listImage = [], title = "" } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <ul style={{ margin: "0", width: "100%" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <button
        style={{
          width: "20px",
          height: "5px",
          margin: "0 5px",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      ></button>
    ),
  };

  return (
    <div
      style={{
        minWidth: "99.1vw",
        width: "100%",
        maxHeight: "calc(100vh - 200px)",
      }}
    >
      <Slider
        style={{
          minWidth: "99.1vw",
          width: "100%",
          maxHeight: "calc(100vh - 200px)",
          overflow: "hidden",
        }}
        {...settings}
      >
        {listImage.map((slide, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={slide}
              alt={index}
              style={{ minWidth: "99.1vw", maxHeight: "calc(100vh - 200px)" }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.05)", // Dark overlay with transparency
              }}
            ></div>
          </div>
        ))}
      </Slider>

      <div
        className="font-bold container max-w-screen-xl text-xl top-[10%] min-[324px]:top-[15%] md:top-[30%] lg:text-5xl lg:top-[35%]"
        style={{
          position: "absolute",

          left: "5%",
          width: "90%",
          color: "white",
          textAlign: "left",
          padding: "10px",
        }}
      >
        {title}
      </div>
    </div>
  );
}
