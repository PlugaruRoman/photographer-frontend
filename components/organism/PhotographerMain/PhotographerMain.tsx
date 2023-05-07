import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Col, Row, Space, Tooltip } from "antd";
import { IPhotographerCard } from "@/types/Photographer";
import { calcAge } from "@/utils/calcDate";
import React from "react";

interface PhotographerMainProps {
  user: IPhotographerCard;
}

const PhotographerMain: React.FC<PhotographerMainProps> = ({ user }) => {
  const createdAt = React.useMemo(() => {
    return calcAge(user.createdAt);
  }, [user]);

  return (
    <Row className="photographer-info" gutter={[26, 15]}>
      <Col>
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar
            shape="square"
            size={200}
            src={process.env.NEXT_PUBLIC_FS_URL + "/" + user.avatar}
          />
        </Badge.Ribbon>
      </Col>
      <Col span={8}>
        <Space size="large" direction="vertical">
          <Tooltip
            open={true}
            autoAdjustOverflow
            color="#262b31"
            zIndex={1}
            placement="rightTop"
            className="photographer-card__name"
            title={user.company}
          >
            <span className="photographer-info__name">{`${user.firstname} ${user.lastname}`}</span>
          </Tooltip>
          <div className="photographer-info__city">{`Moldova,${user?.city}`}</div>
          <div className="photographer-info__about">{user?.about}</div>
          <div className="photographer-info__created">
            With us {createdAt ? `${Object.values(createdAt)} ${Object.keys(createdAt)}` : ""}
          </div>
          <div className="photographer-info__visited">visited {user?.viewsCount}</div>

          <div className="photographer-info__hour">hour {user?.hour}</div>

          <div className="photographer-info__price">price {user?.price}</div>
        </Space>
      </Col>
      <Col className="photographer-info__right" span={8}>
        <div className="photographer-info__phone">Phone number {`+373 ${user?.phone}`}</div>
        <div className="photographer-info__email">{`mail ${user?.email} `}</div>
        <div className="photographer-info__facebook">facebook {user?.facebook}</div>
        <div className="photographer-info__instagram">instagram {user?.instagram}</div>
        <div className="photographer-info__web">web {user?.web}</div>
        <div className="photographer-info__twitter">twitter {user?.twitter}</div>
      </Col>
    </Row>
  );
};

export default PhotographerMain;
