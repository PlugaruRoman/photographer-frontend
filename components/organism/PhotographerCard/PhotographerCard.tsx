import { useState, useMemo } from "react";
import Link from "next/link";
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

import PhoneModal from "@/components/molecules/PhoneModal/PhoneModal";
import { HasProps } from "@/components/molecules/HasProps/HasProps";
import { Packages } from "./atoms/Packages";
import { IPhotographerCard } from "@/types/photographer";
import { NavItems } from "@/types/enums";

interface PhotographerCardProps {
  user: IPhotographerCard;
}

const PhotographerCard = ({ user }: PhotographerCardProps) => {
  const { t } = useTranslation();
  const [phoneModal, setPhoneModal] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>("photographer");

  const onChangeTab = (key: string) => {
    setActiveTabKey(key);
  };

  const onShowModal = () => {
    setPhoneModal(true);
  };

  const onClickOk = () => {
    setPhoneModal(false);
  };

  const onClickCancel = () => {
    setPhoneModal(false);
  };

  const contentList: Record<string, React.ReactNode> = useMemo(
    () => ({
      photographer: (
        <Row>
          <Col span={5}>
            <Avatar
              shape="square"
              alt="avatar"
              // src={process.env.NEXT_PUBLIC_FS_URL + "/" + user.avatar}
              icon={<UserOutlined />}
              size={164}
            />
          </Col>

          <Col className="photographer-card__content" span={19}>
            <Row justify="space-between">
              <Tooltip
                open={!!user.company}
                autoAdjustOverflow
                color="#1b2026"
                zIndex={1}
                placement="rightTop"
                className="photographer-card__name"
                title={user.company}
              >
                <span className="photographer-card__company">{`${user.firstname} ${user.lastname}`}</span>
              </Tooltip>

              <HasProps condition={!!user.web}>
                <Link target="_blank" href={"https://" + user.web}>
                  <Button icon={<ChromeOutlined />} size="large">
                    {user.web}
                  </Button>
                </Link>
              </HasProps>
            </Row>

            <Row>
              <HasProps condition={!!user.country}>
                <div className="photographer-card__country">{user.country}</div>
              </HasProps>
            </Row>

            <Row justify="space-between">
              <HasProps condition={!!user.price}>
                <Space size="small">
                  <DollarOutlined className="photographer-card__price" />
                  <Space size="small" className="photographer-card__price">
                    {user.price} {t("photographers:per_hour")}
                    <HasProps condition={!!user.hour}>
                      <Space size="small" className="photographer-card__price-hour">
                        {t("photographers:minimum")}
                        {user?.hour}
                        {user?.hour
                          ? user?.hour
                          : 1 > 1
                          ? t("photographers:hs")
                          : t("photographers:h")}
                      </Space>
                    </HasProps>
                  </Space>
                </Space>
              </HasProps>

              <Space className="photographer-card__right">
                <HasProps condition={!!user.phone}>
                  <Button size="large" onClick={onShowModal} icon={<PhoneOutlined />}>
                    {t("photographers:call")}
                  </Button>
                </HasProps>

                <HasProps condition={!!user.facebook}>
                  <Link target="_blank" href={"https://" + user.facebook}>
                    <Button size="large" icon={<FacebookOutlined />}>
                      {t("photographers:facebook")}
                    </Button>
                  </Link>
                </HasProps>

                <HasProps condition={!!user.instagram}>
                  <Link target="_blank" href={"https://" + user.instagram}>
                    <Button size="large" icon={<InstagramOutlined />}>
                      {t("photographers:instagram")}
                    </Button>
                  </Link>
                </HasProps>
              </Space>
            </Row>
          </Col>
        </Row>
      ),
      packages: <Packages user={user.user} />,
      photo: <p>project content</p>,
    }),

    [user, t],
  );

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
        handleCancel={onClickCancel}
        handleOk={onClickOk}
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
        onTabChange={onChangeTab}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  );
};

export default PhotographerCard;
