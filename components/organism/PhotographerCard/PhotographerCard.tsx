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
  WechatOutlined,
  DropboxOutlined,
  MailOutlined,
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

  const { data = [] } = useQuery("all-photo", PhotographersService.getPhoto);

  const images = React.useMemo(() => {
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
          <Avatar shape="square" size={100} icon={<UserOutlined color="black" />} />
          <p className="avatar-card">{info.firstname + " " + info.lastname}</p>
        </>
      ),
    },
    {
      key: "pictures",
      tab: (
        <>
          <Avatar shape="square" size={100} icon={<PictureOutlined />} />
          <p className="avatar-card">Photo</p>
        </>
      ),
    },
    {
      key: "packages",
      tab: (
        <>
          <Avatar shape="square" size={100} icon={<DropboxOutlined />} />
          <p className="avatar-card">Service packages</p>
        </>
      ),
    },
    {
      key: "chat",
      tab: (
        <>
          <Avatar shape="square" size={100} icon={<WechatOutlined />} />
          <p className="avatar-card">Chat</p>
        </>
      ),
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    user: (
      <>
        <Space size={"large"}>
          <div className="info-city">{info.city}</div>
          <span className="info-company">{info.company}</span>
        </Space>

        <Space className="photographer-card__content" direction="vertical" size="small">
          {info.facebook && (
            <a target="_blank" href={`//${info.facebook}`} rel="noreferrer">
              <FacebookFilled className="card-facebook" />
            </a>
          )}

          {info.instagram && (
            <a target="_blank" href={`//${info.instagram}`} rel="noreferrer">
              <InstagramOutlined className="card-instagram" />
            </a>
          )}

          {info.phone && <PhoneOutlined onClick={showModal} className="card-phone" />}
        </Space>

        <Row>
          <Col span={16}>
            <span className="info-about">{info.about}</span>
          </Col>
        </Row>
        <Space size="large" className="bottom-card">
          {info.price && (
            <Space align="center" className="info-price__block">
              <div className="info-price">{info.price}</div>
              <DollarCircleFilled className="info-price__icon" />
              <span className="info-price__hour">Per hour</span>
            </Space>
          )}

          {info.web && (
            <a target="_blank" href={`http://${info.web}`} className="info-web" rel="noreferrer">
              {info.web}
            </a>
          )}

          {info.email && (
            <div className="info-email">
              <MailOutlined /> <span>{info.email}</span>
            </div>
          )}
        </Space>
      </>
    ),
    pictures: (
      <div className="card-photo">
        <Image.PreviewGroup>{images}</Image.PreviewGroup>
      </div>
    ),
    packages: (
      <>
        <div>- 3 pachete diverse perfecte pentru orice eveniment</div>
        <div>- consultație care să vă ajute la organizarea evenimentului;</div>
        <div>- consultație care să vă ajute la organizarea evenimentului;</div>
        <div>- foto/video de la îmbrăcatul mirilor până la tortul mirilor.</div>
        <div>- prelucrarea și montarea întregului material;</div>
        <div>- înscrierea întregului material pe stick-uri memorie USB + cutie personalizata;</div>
        <div>- durata întregului film 1,5-2 ore + rezumatul nuntii 3-5 minute;</div>
        <div>- imprimare a 10 fotografii;</div>
        <div>- utilizarea luminii suplimentare;</div>
      </>
    ),
  };

  const extraContent = (
    <Link href={`/photographers/${id}/`} className="more-info">
      <span>More Info</span>
      <MoreOutlined />
    </Link>
  );

  return (
    <>
      <Card
        className="photographer-card"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={extraContent}
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
