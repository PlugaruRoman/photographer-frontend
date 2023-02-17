import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Layout, Menu, MenuProps } from "antd";

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
        key: String(10),
        icon: React.createElement(UserOutlined),
        label: <Link href={"/edit-user"}>User</Link>,
      },
      {
        key: String(11),
        icon: React.createElement(VideoCameraOutlined),
        label: <Link href={"/add-photo"}>Add Photo</Link>,
      },
      {
        key: String(12),
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
          style={{
            height: "100vh",
            position: "sticky",
            background: "#262B31",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#70CF97",
              }}
            />

            <span style={{ marginLeft: "10px", color: "#ffff" }}>{!collapsed && user}</span>
          </div>
          <Menu style={{ backgroundColor: "#262B31" }} mode="inline" items={siderItems} />
        </Layout.Sider>
      )}

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            background: "#262B31",
          }}
        >
          <Menu
            selectedKeys={[pathname]}
            mode="horizontal"
            items={item}
            activeKey={pathname}
            style={{
              width: "100%",
              color: "#d9d9d9",
              background: "#262B31",
            }}
          />

          <div
            style={{
              color: "#d9d9d9",
              background: "#262B31",
            }}
          >
            LOGO
          </div>
          <Menu
            mode="horizontal"
            items={itemRight}
            selectedKeys={[pathname]}
            activeKey={pathname ? pathname : ""}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              color: "#d9d9d9",
              background: "#262B31",
            }}
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
        <Footer style={{ textAlign: "center", background: "#262B31", color: "white" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
