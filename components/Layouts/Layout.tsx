import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Layout, Menu, MenuProps, Space, notification } from "antd";
import { UserOutlined, VideoCameraOutlined, LoginOutlined, EditOutlined } from "@ant-design/icons";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import LoginModal from "../molecules/LoginModal/LoginModal";
import RegisterModal from "../molecules/RegisterModal/RegisterModal";
import { Auth, NavItems } from "@/types/enums";
import { useMutation } from "react-query";
import { AuthService } from "@/api/auth";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { pathname } = useRouter();

  const [collapsed, setCollapsed] = React.useState(false);
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
    onSuccess: (res) => {
      // localStorage.setItem("user", res.config.data);
      // localStorage.setItem("Token", res.data.jwt);
      // setUser(JSON.parse(res.config.data).identifier);
      notification.success({
        message: "Successfully",
      });
    },
    onError: () => {
      notification.error({
        message: "Error!",
        description: `The username or password is incorrect`,
      });
    },
  });

  const onClickLogOut = () => mutate();

  const siderItems: MenuProps["items"] = React.useMemo(
    () => [
      {
        key: NavItems.CREATE_PROFILE,
        icon: <UserOutlined />,
        label: <Link href={NavItems.CREATE_PROFILE}>Create profile</Link>,
      },
      {
        key: NavItems.UPLOAD_PHOTO,
        icon: <VideoCameraOutlined />,
        label: <Link href={NavItems.UPLOAD_PHOTO}>Upload photo</Link>,
      },
      {
        key: NavItems.ADD_PACKAGES,
        icon: <EditOutlined />,
        label: <Link href={NavItems.ADD_PACKAGES}>Add packages</Link>,
      },
    ],
    [],
  );

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
            key: Auth.LOGIN,
            label: <div onClick={showModalLogin}>{Auth.LOGIN}</div>,
          }
        : null,
      user
        ? null
        : {
            key: Auth.REGISTER,
            label: <div onClick={showModalRegister}>{Auth.REGISTER}</div>,
          },

      user
        ? {
            key: Auth.LOGOUT,
            label: (
              <Space onClick={onClickLogOut}>
                <span>{Auth.LOGOUT}</span>
                <LoginOutlined />
              </Space>
            ),
          }
        : null,
    ],
    [user, onClickLogOut],
  );

  return (
    <Layout>
      {user && (
        <Layout.Sider
          className="main-layout"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Space size="middle" className="main-layout__user">
            <Avatar className="main-layout__avatar" icon={<UserOutlined />} />
            <span className="main-layout__username">{!collapsed && user}</span>
          </Space>
          <Menu
            className="main-layout__menu"
            mode="inline"
            items={siderItems}
            selectedKeys={[pathname]}
          />
        </Layout.Sider>
      )}

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
            className="header-menu__right"
            items={itemRight}
            selectedKeys={[pathname]}
            activeKey={pathname ? pathname : ""}
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
