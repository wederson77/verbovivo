import React, { useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = () => {
  const images = [
    "/images/firstImage.svg",
    "/images/secound.svg",
    "/images/thirdImage.svg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="carrossel">
      <a href="https://pix-interface.vercel.app/" target="_blank" rel="noopener noreferrer">
        <img
          key={currentIndex}  // Isso força a recriação da imagem
          className="fadeIn"
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
        />
      </a>
    </div>
  );
};

export default Carousel;
