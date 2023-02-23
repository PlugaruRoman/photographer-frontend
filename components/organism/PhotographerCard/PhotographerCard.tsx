import React from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { Avatar, Card, Col, Image, Row, Space } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  FacebookFilled,
  MoreOutlined,
  InstagramOutlined,
  PhoneOutlined,
  DollarCircleFilled,
} from "@ant-design/icons";

import { PhotographersService } from "@/api/photographers/photographers";
import PhoneModal from "../../molecules/PhoneModal/PhoneModal";
import { IPhotographerCard } from "@/types/Photographer";

interface PhotographerCardProps {
  info: IPhotographerCard;
  id: number;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({ info, id }) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>("user");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const { data } = useQuery("all-photo", PhotographersService.getPhoto);

  const images = React.useMemo(() => {
    return (
      data &&
      data.map((img: any) => (
        <Image
          key={img.id}
          alt={img.alternativeText}
          height={"100%"}
          src={`http://localhost:1337${img.url}`}
        />
      ))
    );
  }, [data]);

  const tabListNoTitle = [
    {
      key: "user",
      tab: (
        <>
          <Avatar shape="square" size={100} icon={<UserOutlined color="black" />} />
          <p style={{ color: "#d9d9d9" }}>{info.firstname + " " + info.lastname}</p>
        </>
      ),
    },
    {
      key: "pictures",
      tab: (
        <>
          <Avatar shape="square" size={100} icon={<PictureOutlined />} />
          <p style={{ color: "#d9d9d9" }}>Photo</p>
        </>
      ),
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    user: (
      <>
        <Space size={"large"}>
          <div style={{ fontSize: "25px" }}>{info.city}</div>
          <span style={{ fontSize: "25px" }}>{info.company}</span>
        </Space>

        <Space
          style={{ position: "absolute", right: 25, top: "50%" }}
          direction="vertical"
          size="small"
        >
          {info.facebook ? (
            <a target="_blank" href={info.facebook} rel="noreferrer">
              <FacebookFilled style={{ fontSize: "50px", color: "#4267B2" }} />
            </a>
          ) : (
            ""
          )}

          {info.instagram ? (
            <a target="_blank" href={`//${info.instagram}`} rel="noreferrer">
              <InstagramOutlined
                style={{
                  color: "#8a3ab9",
                  fontSize: "50px",
                }}
              />
            </a>
          ) : (
            ""
          )}

          {info.phone ? (
            <PhoneOutlined onClick={showModal} style={{ fontSize: "50px", color: "#4267B2" }} />
          ) : (
            ""
          )}
        </Space>

        <Row>
          <Col span={16}>
            <span style={{ fontSize: "15px" }}>{info.about}</span>
          </Col>
        </Row>
        {info.price ? (
          <div style={{ display: "flex", alignItems: "center", position: "absolute", bottom: 5 }}>
            <div style={{ marginRight: "5px", fontSize: "35px" }}>{info.price}</div>
            <DollarCircleFilled style={{ fontSize: "35px", color: "#70cf97" }} />
            <span style={{ marginLeft: "5px", fontSize: "25px" }}>Per hour</span>
          </div>
        ) : (
          ""
        )}
        <a
          target="_blank"
          href={info.web}
          className="web-link"
          style={{
            fontSize: "25px",
            position: "absolute",
            bottom: 14,
            right: 125,
            color: "#d9d9d9",
          }}
          rel="noreferrer"
        >
          {info.web}
        </a>
      </>
    ),
    pictures: (
      <Image.PreviewGroup>
        {
          <div
            style={{
              height: "250px",
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
            }}
          >
            {images}
          </div>
        }
      </Image.PreviewGroup>
    ),
  };

  return (
    <>
      <Card
        style={{
          width: "80%",
          height: "431px",
          margin: "20px auto",
          color: "white",
          background: "linear-gradient(110.83deg, #23282E -2.21%, #2A3139 104.21%)",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={
          <Link
            href={"/photographers/photographer/" + id}
            className="web-link"
            style={{ color: "#d9d9d9", fontSize: "15px" }}
          >
            <span>More Info</span>
            <MoreOutlined />
          </Link>
        }
        onTabChange={onTabChange}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
      {isModalOpen && (
        <PhoneModal
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          info={info}
        />
      )}
    </>
  );
};
