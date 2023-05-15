import { useMemo } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Avatar, Badge, Button, Col, Popconfirm, Row, Space, Tooltip, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { HasProps } from "@/components/molecules/HasProps/HasProps";
import { calcAge } from "@/utils/calc";
import { PhotographersService } from "@/api/photographers";
import { IPhotographerCard } from "@/types/photographer";
interface PhotographerMainProps {
  user?: IPhotographerCard;
}

const PhotographerMain = ({ user }: PhotographerMainProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user: profile } = useAuth();

  const withUs = useMemo(() => {
    if (user?.createdAt) return calcAge(user.createdAt);
  }, [user]);

  const confirm = () => {
    if (user?._id) mutate(user._id);
  };

  const { mutate } = useMutation(PhotographersService.deletePhotographer, {
    onSuccess: () => {
      router.push("/photographers");
      notification.success({
        message: t("notification:success"),
      });
    },
    onError: (e: any) => {
      notification.error({
        message: e.response.data.message,
      });
    },
  });

  return (
    <Row className="photographer-info" gutter={[26, 15]}>
      <Col>
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar
            shape="square"
            size={200}
            src={process.env.NEXT_PUBLIC_FS_URL + "/" + user?.avatar || <UserOutlined />}
          />
        </Badge.Ribbon>
      </Col>
      <Col span={8}>
        <Space size="large" direction="vertical">
          <Tooltip
            open={!!user?.company}
            autoAdjustOverflow
            color="#262b31"
            zIndex={1}
            placement="rightTop"
            className="photographer-card__name"
            title={user?.company}
          >
            <span className="photographer-info__name">{`${user?.firstname} ${user?.lastname}`}</span>
          </Tooltip>
          <div className="photographer-info__country">{`Moldova,${user?.country}`}</div>
          <div className="photographer-info__about">{user?.about}</div>
          <div className="photographer-info__created">
            With us {withUs ? `${Object.values(withUs)} ${Object.keys(withUs)}` : ""}
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

      <HasProps condition={profile?.id === user?.user}>
        <Popconfirm
          placement="topRight"
          title={"Are you sure to delete this profile?"}
          description={"Delete the profile"}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="large">
            Delete Profile
          </Button>
        </Popconfirm>
      </HasProps>
    </Row>
  );
};

export default PhotographerMain;
