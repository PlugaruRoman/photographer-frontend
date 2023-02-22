import { PhotographersService } from "@/api/photographers/photographers";
import { Avatar, Col, Image, Row, Space } from "antd";
import { useQuery } from "react-query";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

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
            <div key={img.id} style={{ position: "relative" }}>
              <Link
                href="/photographers/photographer/1"
                style={{ position: "absolute", zIndex: 2, cursor: "pointer" }}
              >
                <Avatar size={44} icon={<UserOutlined />} />
                <span style={{ color: "white" }}>User Name</span>
              </Link>
              <Image
                style={{ position: "relative" }}
                key={img.id}
                alt={img.alternativeText}
                height={"100%"}
                src={`http://localhost:1337${img.url}`}
              />
            </div>
          ))}
      </Space>
    </Space>
  );
};

export default HomePageGallery;
