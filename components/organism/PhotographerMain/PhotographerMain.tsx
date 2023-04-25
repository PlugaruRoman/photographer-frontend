import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import { IPhotographerCard } from "@/types/Photographer";

interface PhotographerMainProps {
  user: IPhotographerCard;
}

const PhotographerMain: React.FC<PhotographerMainProps> = ({ user }) => {
  return (
    <Space align="start" size="large">
      <Badge.Ribbon color="gold" text="Pro">
        <Avatar shape="square" size={200} icon={<UserOutlined />} />
      </Badge.Ribbon>
      <Space size="large" direction="vertical">
        <div className="photographer-info__name">{`Photographer ${user.firstname} ${user.lastname}`}</div>
        <div className="photographer-info__city">{`Moldova,${user.city}`}</div>
        <div className="photographer-info__about">{user.about}</div>
      </Space>
      <div className="photographer-info__phone">Phone number {`+373 ${user.phone}`}</div>
    </Space>
  );
};

export default PhotographerMain;
