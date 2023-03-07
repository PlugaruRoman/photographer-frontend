import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";

interface IUser {
  about: string;
  firstname: string;
  lastname: string;
  company: string;
  city: string;
  price: number;
  phone: string;
  facebook: string;
  instagram: string;
  web: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user?: string;
}

interface PhotographerMainProps {
  user: IUser;
}

const PhotographerMain: React.FC<PhotographerMainProps> = ({ user }) => {
  return (
    <div className="photographer-main">
      <Space align="start" size="large">
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        </Badge.Ribbon>
        <Space size="large" direction="vertical">
          <div className="photographer-main__name">{`Photographer ${user.firstname} ${user.lastname}`}</div>
          <div className="photographer-main__city">{`Moldova,${user.city}`}</div>
          <div className="photographer-main__about">{user.about}</div>
          <div className="photographer-main__created">{`With us from date ${
            user.createdAt.toString().split("T")[0]
          }`}</div>
        </Space>
        <div className="photographer-main__phone">Phone number {`+373 ${user.phone}`}</div>
      </Space>
    </div>
  );
};

export default PhotographerMain;
