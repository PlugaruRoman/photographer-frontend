import { PhotographersService } from "@/api/photographers/photographers";
import { Avatar, Row, Space } from "antd";
import { useQuery } from "react-query";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const HomePageGallery: React.FC = () => {
  const { data } = useQuery("all-photo", PhotographersService.getPhoto);

  return (
    <Space
      size={"large"}
      style={{
        padding: "30px 0px 30px 0px",
        background: "#1B2026",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <h1 style={{ color: "white", fontSize: "25px" }}>
          The best wedding and family photos of the week
        </h1>
      </Row>
      <Space
        style={{
          width: "100%",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data &&
          data.map((img: any) => (
            <div className="home-page__images" key={img.id}>
              <Space className="home-page__users">
                <Link style={{ position: "relative" }} href="/photographers/1">
                  <Avatar size={44} icon={<UserOutlined />} />
                  <span style={{ color: "white" }}>User Name</span>
                </Link>
              </Space>
              <Image
                placeholder="blur"
                alt={img.name}
                className="imagine"
                width={320}
                height={300}
                blurDataURL={`http://localhost:1337${img.url}`}
                src={`http://localhost:1337${img.url}`}
                sizes="(max-width: 500px) 100px"
              />
            </div>
          ))}
      </Space>
    </Space>
  );
};

export default HomePageGallery;
