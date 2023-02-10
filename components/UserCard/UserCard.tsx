import { Avatar, Card, Image } from "antd";
import React, { useState } from "react";
import { UserOutlined, PictureOutlined, IdcardOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { UsersService } from "@/api/users/users";

interface UsersCard {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  about: string;
  city: string;
  company: string;
  facebook: string;
  firstname: string;
  instagram: string;
  lastname: string;
  phone: string;
  price: number;
  twitter: string;
  web: string;
  photo: any;
}

interface UserCardProps {
  info: UsersCard;
}

export const UserCard: React.FC<UserCardProps> = ({ info }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("user");

  const { data, isLoading } = useQuery("all-photo", UsersService.getPhoto);

  const images = React.useMemo(() => {
    return (
      data &&
      data.map((img: any) => (
        <Image
          key={img.id}
          alt={img.alternativeText}
          width={100}
          height={100}
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
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
          <p>{info.firstname + " " + info.lastname}</p>
        </>
      ),
    },
    {
      key: "pictures",
      tab: (
        <>
          <Avatar shape="square" size={64} icon={<PictureOutlined />} />
          <p>Photo</p>
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
    user: <p>{info.company}</p>,
    pictures: <Image.PreviewGroup>{images}</Image.PreviewGroup>,
    about: <p>{info.about}</p>,
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
