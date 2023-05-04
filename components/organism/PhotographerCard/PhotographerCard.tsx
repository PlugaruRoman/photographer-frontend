import { IPhotographerCard } from "@/types/Photographer";
import { NavItems } from "@/types/enums";
import { useTranslation } from "next-i18next";
import { Avatar, Button, Card, Col, Row, Space, Tooltip } from "antd";
import {
  DollarOutlined,
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
  ChromeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import PhoneModal from "@/components/molecules/PhoneModal/PhoneModal";

interface PhotographerCardProps {
  user: IPhotographerCard;
}

const PhotographerCard: React.FC<PhotographerCardProps> = ({ user }) => {
  const { t } = useTranslation();
  const [phoneModal, setPhoneModal] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>("photographer");

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const showModal = () => {
    setPhoneModal(true);
  };

  const handleOk = () => {
    setPhoneModal(false);
  };

  const handleCancel = () => {
    setPhoneModal(false);
  };

  const contentList: Record<string, React.ReactNode> = {
    photographer: (
      <Row>
        <Col span={5}>
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        </Col>

        <Col
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          span={19}
        >
          <Row justify="space-between">
            <Tooltip
              open={true}
              autoAdjustOverflow
              color="#1b2026"
              zIndex={1}
              placement="rightTop"
              className="photographer-card__name"
              title={user.company}
            >
              <span className="photographer-card__company">{`${user.firstname} ${user.lastname}`}</span>
            </Tooltip>
            <Link target="_blank" href={"https://" + user.web}>
              <Button icon={<ChromeOutlined />} size="large">
                {user.web}
              </Button>
            </Link>
          </Row>

          <Row>
            <div className="photographer-card__city">{user.city}</div>
          </Row>

          <Row justify="space-between">
            <Space>
              <DollarOutlined className="photographer-card__price" />
              <div className="photographer-card__price">
                {user.price + " " + t("photographers:per_hour")}{" "}
                <span style={{ color: "#808080", fontSize: "15px" }}>
                  {t("photographers:minimum")} {user.hour}{" "}
                  {user.hour > 1 ? t("photographers:hs") : t("photographers:h")}
                </span>
              </div>
            </Space>
            <Space className="photographer-card__right">
              <Button size="large" onClick={showModal} icon={<PhoneOutlined />}>
                {t("photographers:call")}
              </Button>

              <Link target="_blank" href={"https://" + user.facebook}>
                <Button size="large" icon={<FacebookOutlined />}>
                  facebook
                </Button>
              </Link>

              <Link type="default" target="_blank" href={"https://" + user.instagram}>
                <Button size="large" icon={<InstagramOutlined />}>
                  instagram
                </Button>
              </Link>
            </Space>
          </Row>
        </Col>
      </Row>
    ),
    packages: <p>app content</p>,
    photo: <p>project content</p>,
  };

  const tabList = [
    {
      key: "photographer",
      tab: t("photographers:photographer"),
    },
    {
      key: "packages",
      tab: t("photographers:packages"),
    },
    {
      key: "photo",
      tab: t("photographers:photos"),
    },
  ];

  return (
    <>
      <PhoneModal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={phoneModal}
        info={user}
      />
      <Card
        className="photographer-card"
        bodyStyle={{ color: "#ffffff" }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        tabBarExtraContent={
          <Link href={NavItems.MY_PAGE + user.user}>{t("photographers:more_info")}</Link>
        }
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

export default PhotographerCard;
