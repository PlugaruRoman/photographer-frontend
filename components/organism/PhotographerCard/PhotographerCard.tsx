import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { Avatar, Card, Image } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  FacebookFilled,
  MoreOutlined,
  InstagramOutlined,
  PhoneOutlined,
  DollarCircleTwoTone,
} from "@ant-design/icons";

import { PhotographersService } from "@/api/photographers/photographers";
import PhoneModal from "../../molecules/PhoneModal/PhoneModal";
import { IPhotographerCard } from "@/types/Photographer";

interface PhotographerCardProps {
  info: IPhotographerCard;
  id: number;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({ info, id }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("user");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

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
        <div style={{ fontSize: "20px" }}>studio: {info.company}</div>
        <div style={{ fontSize: "25px" }}>city: {info.city}</div>
        <Card style={{ width: 200 }}>
          <h3 style={{ fontSize: "20px" }}> Social Network</h3>
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
        </Card>

        {info.phone ? (
          <PhoneOutlined onClick={showModal} style={{ fontSize: "40px", color: "#4267B2" }} />
        ) : (
          ""
        )}
        {info.price ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "5px" }}>price: {info.price}</div>
            <DollarCircleTwoTone style={{ fontSize: "20px", color: "#4267B2" }} />
          </div>
        ) : (
          ""
        )}
        <div>{info.web}</div>
        <div>
          <span>About me :</span> <span>{info.about}</span>
        </div>
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
          margin: "20px auto",
          height: "350px",
          color: "white",
          background: "linear-gradient(110.83deg, #23282E -2.21%, #2A3139 104.21%)",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={
          <Link href={"/photographers/photographer/" + id} style={{ color: "#ffffff" }}>
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
