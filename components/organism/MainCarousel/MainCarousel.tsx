import React from "react";
import { Button, Carousel, Col, Row, Space } from "antd";

import imageOne from "../../../public/imageOne.jpg";
import imageTwo from "../../../public/imageTwo.jpg";
import imageThree from "../../../public/imageThree.jpg";
import imageFour from "../../../public/imageFour.jpg";
import Image from "next/image";
import Link from "next/link";

const MainCarousel: React.FC = () => {
  const images = [imageOne, imageTwo, imageThree, imageFour];

  return (
    <>
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          zIndex: 1,
          position: "absolute",
          top: "50%",
          right: "50%",
          marginRight: "-250px",
          width: "500px",
          textAlign: "center",
        }}
      >
        <Col span={24}>
          <Space style={{ margin: "0 auto" }} size={"large"} direction="vertical">
            <h1 style={{ color: "white", fontSize: "30px" }}>
              Welcome to our app - find the perfect photographer for your event effortlessly
            </h1>
            <Button size="large" type="default">
              <Link href="/photographers"> Find photographer</Link>
            </Button>
          </Space>
        </Col>
      </Row>
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
