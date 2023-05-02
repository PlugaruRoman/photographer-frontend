import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Button, Carousel, Space } from "antd";

import imageOne from "../../../public/imageOne.jpeg";
import imageTwo from "../../../public/imageTwo.jpeg";
import imageThree from "../../../public/imageThree.jpeg";
import imageFour from "../../../public/imageFour.jpeg";

const MainCarousel: React.FC = () => {
  const { t } = useTranslation();
  const images = [imageOne, imageTwo, imageThree, imageFour];

  return (
    <>
      <Space className="main-carousel__content" size={"large"} direction="vertical">
        <h1 className="title">{t("home:welcome_msg")}</h1>
        <Link href="/photographers">
          <Button size="large" type="default">
            {t("home:find_photographer")}
          </Button>
        </Link>
      </Space>

      <Carousel dots={false} pauseOnHover={false} autoplay effect="fade">
        {images.map((image, index) => (
          <Image
            key={index}
            placeholder="blur"
            width={1000}
            height={600}
            alt={String(index)}
            src={image}
          />
        ))}
      </Carousel>
    </>
  );
};

export default MainCarousel;
