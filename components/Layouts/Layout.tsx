import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Layout, Menu, MenuProps, Space } from "antd";
import { UserOutlined, VideoCameraOutlined, LoginOutlined, EditOutlined } from "@ant-design/icons";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import LoginModal from "../molecules/LoginModal/LoginModal";
import RegisterModal from "../molecules/RegisterModal/RegisterModal";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, onClickLogOut } = useAuth();
  const { pathname } = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalRegister = () => {
    setIsModalOpenRegister(true);
  };

  const handleCancelRegister = () => {
    setIsModalOpenRegister(false);
  };

  const siderItems: MenuProps["items"] = React.useMemo(
    () => [
      {
        key: "/edit-user",
        icon: React.createElement(UserOutlined),
        label: <Link href={"/edit-user"}>User</Link>,
      },
      {
        key: "/add-photo",
        icon: React.createElement(VideoCameraOutlined),
        label: <Link href={"/add-photo"}>Add Photo</Link>,
      },
      {
        key: "/photographers",
        icon: React.createElement(EditOutlined),
        label: <Link href={"/photographers"}>Edit User</Link>,
      },
    ],
    [],
  );

  const item = [
    {
      key: "/",
      label: <Link href={`/`}>Home</Link>,
    },
    {
      key: "/photographers",
      label: <Link href={"/photographers"}>Photographers</Link>,
    },
  ];

  const itemRight = React.useMemo(
    () => [
      !user
        ? {
            key: "/login",
            label: <div onClick={showModal}>Login</div>,
          }
        : null,
      user
        ? null
        : {
            key: "/register",
            label: <div onClick={showModalRegister}>Register</div>,
          },

      user
        ? {
            key: "logout",
            label: (
              <div onClick={onClickLogOut}>
                <span style={{ marginRight: "10px" }}>Logout</span>
                <LoginOutlined />
              </div>
            ),
          }
        : null,
    ],
    [user, onClickLogOut],
  );

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      {user && (
        <Layout.Sider
          className="main-layout__sider"
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
        {isModalOpen && <LoginModal handleCancel={handleCancel} isModalOpen={isModalOpen} />}
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
