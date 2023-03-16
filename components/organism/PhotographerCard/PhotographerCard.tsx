import React from "react";
import { useQuery } from "react-query";
import { Card, Col, Image, Row, Space } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  FacebookFilled,
  InstagramOutlined,
  PhoneOutlined,
  DollarCircleFilled,
  WechatOutlined,
  DropboxOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { PhotographersService } from "@/api/photographers/photographers";
import PhoneModal from "../../molecules/PhoneModal/PhoneModal";
import ExtraContent from "./molecules/ExtraContent/ExtraContent";
import Chat from "../Chat/Chat";
import { IPhotographerCard } from "@/types/Photographer";
import { PackagesService } from "@/api/offer/offer";

interface PhotographerCardProps {
  info: IPhotographerCard;
  id: number;
}

export enum TabListNoTitle {
  USER = "UserOutlined",
  PHOTO = "PictureOutlined",
  PACKAGES = "DropboxOutlined",
  CHAT = "WechatOutlined",
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

  const { data = [] } = useQuery("card-photo", PhotographersService.getCardPhoto);
  const { data: packages = [], isLoading } = useQuery("card-packages", PackagesService.getPackages);

  const photo = React.useMemo(() => {
    return data.map((img: any) => (
      <Image
        key={img.id}
        alt={img.alternativeText}
        height={"100%"}
        src={`http://localhost:1337${img.url}`}
      />
    ));
  }, [data]);

  const tabListNoTitle = [
    {
      key: "user",
      tab: (
        <>
          <UserOutlined className="photographer-card__icon" />
          <p className="photographer-card__avatar-text">{info.firstname + " " + info.lastname}</p>
        </>
      ),
    },
    {
      key: "pictures",
      tab: (
        <>
          <PictureOutlined className="photographer-card__icon" />
          <p className="photographer-card__avatar-text">Photo</p>
        </>
      ),
    },
    {
      key: "packages",
      tab: (
        <>
          <DropboxOutlined className="photographer-card__icon" />
          <p className="photographer-card__avatar-text">Service packages</p>
        </>
      ),
    },
    {
      key: "chat",
      tab: (
        <>
          <WechatOutlined className="photographer-card__icon" />
          <p className="photographer-card__avatar-text">Chat</p>
        </>
      ),
    },
  ];
  console.log(packages);
  const contentListNoTitle: Record<string, React.ReactNode> = {
    user: (
      <>
        <Row wrap justify="space-between">
          <Space size="large">
            <div className="photographer-card__info-city">{info.city}</div>
            <span className="photographer-card__info-company">{info.company}</span>
          </Space>

          {info.email && (
            <div className="photographer-card__info-email">
              <MailOutlined /> <span>{info.email}</span>
            </div>
          )}

          <Col span={20}>
            <span className="photographer-card__info-about">{info.about}</span>
          </Col>

          <Space direction="vertical" size="small">
            {info.facebook && (
              <a target="_blank" href={`//${info.facebook}`} rel="noreferrer">
                <FacebookFilled className="photographer-card__facebook" />
              </a>
            )}

            {info.instagram && (
              <a target="_blank" href={`//${info.instagram}`} rel="noreferrer">
                <InstagramOutlined className="photographer-card__instagram" />
              </a>
            )}

            {info.phone && (
              <PhoneOutlined onClick={showModal} className="photographer-card__phone" />
            )}
          </Space>

          {info.price && (
            <Space align="center">
              <div className="photographer-card__price">{info.price}</div>
              <DollarCircleFilled className="photographer-card__price-icon" />
              <span className="photographer-card__price-hour">Per hour</span>
            </Space>
          )}

          {info.web && (
            <a
              target="_blank"
              href={`http://${info.web}`}
              className="photographer-card__info-web"
              rel="noreferrer"
            >
              {info.web}
            </a>
          )}
        </Row>
      </>
    ),
    pictures: (
      <div className="photographer-card__photo">
        <Image.PreviewGroup>{photo}</Image.PreviewGroup>
      </div>
    ),
    packages: (
      <>
        {!isLoading
          ? Object.values(packages.data[0].attributes)
              .map((packages: any, i) => (
                <div className="photographer-card__packages" key={i}>{`${
                  i - 2
                } : ${packages}`}</div>
              ))
              .slice(3)
          : "No packages"}
      </>
    ),
    chat: <Chat />,
  };

  return (
    <>
      <Card
        className="photographer-card"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<ExtraContent id={id} />}
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
