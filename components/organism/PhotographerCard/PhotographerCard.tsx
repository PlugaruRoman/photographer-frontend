import { IPhotographerCard } from "@/types/Photographer";
import { Card } from "antd";
import React, { useState } from "react";

const tabList = [
  {
    key: "photographer",
    tab: "Photographer",
  },
  {
    key: "packages",
    tab: "Packages",
  },
  {
    key: "photo",
    tab: "Photo",
  },
];

interface PhotographerCardProps {
  user: IPhotographerCard;
}

const PhotographerCard: React.FC<PhotographerCardProps> = ({ user }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("photographer");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const contentList: Record<string, React.ReactNode> = {
    photographer: (
      <>
        <p>{`${user.firstname} ${user.lastname}`}</p>
        <p>{user.city}</p>
        <p>{user.company}</p>
        <p>{user.phone}</p>
        <p>{user.price}</p>
      </>
    ),
    packages: <p>app content</p>,
    photo: <p>project content</p>,
  };

  return (
    <Card
      style={{ width: "100%", backgroundColor: "#262b31" }}
      bodyStyle={{ color: "#ffffff" }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      tabBarExtraContent={<a href="#">More info about</a>}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};

export default PhotographerCard;
