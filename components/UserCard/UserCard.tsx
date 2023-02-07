import { Avatar, Card, Image } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  PictureOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const contentList: Record<string, React.ReactNode> = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

interface UsersCardProps {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserCardProps {
  info: UsersCardProps;
}

export const UserCard: React.FC<UserCardProps> = (info) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("user");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const tabListNoTitle = [
    {
      key: "user",
      tab: (
        <>
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
          <p>{info.info.username}</p>
        </>
      ),
    },
    {
      key: "pictures",
      tab: (
        <>
          <Avatar shape="square" size={64} icon={<PictureOutlined />} />
          <p>Pictures</p>
        </>
      ),
    },
    {
      key: "about",
      tab: (
        <>
          <Avatar shape="square" size={64} icon={<IdcardOutlined />} />
          <p>About</p>
        </>
      ),
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    user: <p>{info.info.username}</p>,
    pictures: (
      <Image.PreviewGroup>
        <Image
          alt="image"
          width={100}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Image
          alt="image"
          width={100}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </Image.PreviewGroup>
    ),
    about: <p>{info.info.email}</p>,
  };

  return (
    <Card
      style={{ width: "80%", margin: "20px auto", height: "270px" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<a href="#">More</a>}
      onTabChange={onTabChange}
    >
      {contentListNoTitle[activeTabKey]}
    </Card>
  );
};
