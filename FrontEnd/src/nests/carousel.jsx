import { Box, Image, HStack, Center } from "@chakra-ui/react";

import Elevation from "../assets/mockNest/elevation.jpg";
import DrawingRoom from "../assets/mockNest/drawing-room.jpg";
import DinningRoom from "../assets/mockNest/dinning-room.jpg";
import DinningRoom2 from "../assets/mockNest/dinning-room-2.jpg";
import Bathroom3 from "../assets/mockNest/bathroom-3.jpg";
import Bedroom from "../assets/mockNest/bedroom.jpg";
import Bathroom from "../assets/mockNest/bathroom.jpg";
import Bedroom2 from "../assets/mockNest/bed-room-2.jpg";
import Bathroom2 from "../assets/mockNest/bathroom-2.jpg";
import Kitchen from "../assets/mockNest/kitchen.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

export const Carousel = () => {
  const images = [
    Elevation,
    DrawingRoom,
    DinningRoom,
    DinningRoom2,
    Bathroom3,
    Bedroom,
    Bathroom,
    Bedroom2,
    Bathroom2,
    Kitchen,
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => <Center spacing={0}>{dots}</Center>,
    customPaging: (i) => (
      <div
        className="outer"
        style={{
          margin: "0 2px",
          color: "blue",
          width: 40 / images.length + "vw",
          height: 40 / images.length + "vw",
          maxHeight: "5vh",
          maxWidth: "5vh",
        }}
      >
        <div
          key={i}
          style={{
            width: 40 / images.length + "vw",
            height: 40 / images.length + "vw",
            maxHeight: "5vh",
            maxWidth: "5vh",
            // margin: "0 5px",
            cursor: "pointer",
            border:
              i === currentSlide
                ? "2px solid #3182CE"
                : "2px solid transparent",
          }}
          onClick={() => handleThumbnailClick(i)}
        >
          <img
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            style={{
              width: 40 / images.length + "vw",
              height: 40 / images.length + "vw",
              maxHeight: "5vh",
              maxWidth: "5vh",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </div>{" "}
      </div>
    ),
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      w="40vw"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(8px)",
      }}
      borderRadius={8}
      h={"90vh"}
    >
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`House ${index + 1}`}
              style={{
                width: "100%",
                height: "80vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};
