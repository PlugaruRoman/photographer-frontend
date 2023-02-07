import React from "react";
import { Avatar, Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import { UserOutlined, VideoCameraOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAuth } from "@/contextes/AuthContext/useAuth";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, onClickLogOut } = useAuth();

  const siderItems: MenuProps["items"] = React.useMemo(
    () => [
      {
        key: String(10),
        icon: React.createElement(UserOutlined),
        label: <Link href={"/edit"}>User</Link>,
      },
      {
        key: String(11),
        icon: React.createElement(VideoCameraOutlined),
        label: <Link href={"/addphoto"}>Add Photo</Link>,
      },
      {
        key: String(12),
        icon: React.createElement(EditOutlined),
        label: <Link href={"/users"}>Edit User</Link>,
      },
      {
        key: String(13),
        icon: React.createElement(DeleteOutlined),
        label: <Link href={"/users"}>Delete User</Link>,
      },
    ],
    [],
  );

  const item = React.useMemo(
    () => [
      {
        key: 1,
        label: <Link href={"/"}>Home</Link>,
      },
      {
        key: 2,
        label: <Link href={"/users"}>Users</Link>,
      },
    ],
    [],
  );

  const itemRight = React.useMemo(
    () => [
      !user
        ? {
            key: 3,
            label: <Link href={"/login"}>Login</Link>,
          }
        : null,
      user
        ? null
        : {
            key: 4,
            label: <Link href={"/register"}>Register</Link>,
          },

      user
        ? {
            key: 6,
            label: <div onClick={onClickLogOut}>Logout</div>,
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
                backgroundColor: "#f56a00",
              }}
            />

            <span style={{ marginLeft: "10px", color: "#ffffff" }}>{!collapsed && user}</span>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={siderItems} />
        </Layout.Sider>
      )}

      <Layout>
        <Header style={{ position: "sticky", top: 0, zIndex: 2, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={[...item, ...itemRight]}
            defaultSelectedKeys={["1"]}
          />
        </Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};
