import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  LoginOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import LoginModal from "../molecules/LoginModal/LoginModal";
import RegisterModal from "../molecules/RegisterModal/RegisterModal";
import { Auth, NavItems } from "@/types/enums";
import { AuthService } from "@/api/auth";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, setUser } = useAuth();
  const { pathname } = useRouter();

  const [isModalOpenLogin, setIsModalOpenLogin] = React.useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = React.useState(false);

  const showModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };

  const showModalRegister = () => {
    setIsModalOpenRegister(true);
  };

  const handleCancelRegister = () => {
    setIsModalOpenRegister(false);
  };

  const { mutate } = useMutation(AuthService.logoutUser, {
    onSuccess: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("Token");
      setUser(undefined);
    },
  });

  const onClickLogOut = React.useCallback(() => mutate(), [mutate]);

  const item = [
    {
      key: NavItems.HOME,
      label: <Link href={NavItems.HOME}>Home</Link>,
    },
    {
      key: NavItems.PHOTOGRAPHERS,
      label: <Link href={NavItems.PHOTOGRAPHERS}>Photographers</Link>,
    },
  ];

  const itemRight = React.useMemo(
    () => [
      !user
        ? {
            key: Auth.REGISTER,
            label: <div onClick={showModalRegister}>{Auth.REGISTER}</div>,
          }
        : null,

      !user
        ? {
            key: Auth.LOGIN,
            label: <div onClick={showModalLogin}>{Auth.LOGIN}</div>,
          }
        : null,

      user
        ? {
            key: NavItems.USER,
            icon: <MenuOutlined />,
            label: <span>{user?.username}</span>,
            children: [
              {
                key: NavItems.MY_PAGE,
                icon: <PicLeftOutlined />,
                label: <Link href={NavItems.MY_PAGE + user.id}>My page</Link>,
              },
              {
                key: NavItems.CREATE_PROFILE,
                icon: <UserOutlined />,
                label: <Link href={NavItems.CREATE_PROFILE}>Create profile</Link>,
              },
              {
                key: NavItems.UPLOAD_PHOTO,
                icon: <CameraOutlined />,
                label: <Link href={NavItems.UPLOAD_PHOTO}>Upload photo</Link>,
              },
              {
                key: NavItems.ADD_PACKAGES,
                icon: <UnorderedListOutlined />,
                label: <Link href={NavItems.ADD_PACKAGES}>Add packages</Link>,
              },
              {
                key: Auth.LOGOUT,
                icon: <LoginOutlined onClick={onClickLogOut} />,
                label: <span onClick={onClickLogOut}>{Auth.LOGOUT}</span>,
              },
            ],
          }
        : null,
    ],
    [user, onClickLogOut],
  );

  return (
    <Layout className="layout">
      <Layout>
        <Header className="header">
          <Menu
            className="header-menu"
            selectedKeys={[pathname]}
            mode="horizontal"
            items={item}
            activeKey={pathname}
          />

          <div>LOGO</div>
          <Menu
            mode="horizontal"
            selectable={false}
            className="header-menu__right"
            items={itemRight}
          />
        </Header>
        {isModalOpenLogin && (
          <LoginModal handleCancel={handleCancelLogin} isModalOpen={isModalOpenLogin} />
        )}
        {isModalOpenRegister && (
          <RegisterModal
            handleCancelRegister={handleCancelRegister}
            isModalOpenRegister={isModalOpenRegister}
          />
        )}
        <Content>{children}</Content>
        <Footer className="footer">Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};
