import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Col, Row, Space } from "antd";
import { IPhotographerCard } from "@/types/Photographer";

interface PhotographerMainProps {
  user: IPhotographerCard;
}

const PhotographerMain: React.FC<PhotographerMainProps> = ({ user }) => {
  console.log(user);
  return (
    <Row style={{ maxWidth: "1200px" }} gutter={12}>
      <Col>
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar shape="square" size={200} icon={<UserOutlined />} />
        </Badge.Ribbon>
      </Col>
      <Col span={16}>
        <Space size="large" direction="vertical">
          <div className="photographer-info__name">{`Photographer ${user?.firstname} ${user?.lastname}`}</div>
          <div className="photographer-info__company">{`Studio ${user?.company} `}</div>
          <div className="photographer-info__email">{`mail ${user?.email} `}</div>
          <div className="photographer-info__city">{`Moldova,${user?.city}`}</div>
          <div className="photographer-info__about">{user?.about}</div>
          <div className="photographer-info__phone">Phone number {`+373 ${user?.phone}`}</div>
        </Space>
      </Col>
    </Row>
  );
};

export default PhotographerMain;
