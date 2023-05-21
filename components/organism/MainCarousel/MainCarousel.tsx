import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Button, Carousel, Space } from "antd";

import one from "../../../public/one.jpeg";
import two from "../../../public/two.jpeg";
import three from "../../../public/three.jpeg";
import four from "../../../public/four.jpeg";
import five from "../../../public/five.jpeg";

import ten from "../../../public/ten.jpeg";

const MainCarousel = () => {
  const { t } = useTranslation();
  const images = [one, two, three, four, five, ten];

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
