import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Carousel, Space } from "antd";

import imageOne from "../../../public/imageOne.jpeg";
import imageTwo from "../../../public/imageTwo.jpeg";
import imageThree from "../../../public/imageThree.jpeg";
import imageFour from "../../../public/imageFour.jpeg";

const MainCarousel: React.FC = () => {
  const images = [imageOne, imageTwo, imageThree, imageFour];

  return (
    <>
      <Space className="main-carousel__content" size={"large"} direction="vertical">
        <h1 className="title">
          Welcome to our app - find the perfect photographer for your event effortlessly
        </h1>
        <Link href="/photographers">
          <Button size="large" type="default">
            Find photographer
          </Button>
        </Link>
      </Space>

      <Carousel dots={false} pauseOnHover={false} autoplay effect="fade">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <Image placeholder="blur" width={1000} height={600} alt={String(index)} src={image} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default MainCarousel;
