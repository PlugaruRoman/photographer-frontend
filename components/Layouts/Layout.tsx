import React from "react";
import { Avatar, Layout, Menu, Space, theme } from "antd";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/contextes/AuthContext/useAuth";

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, onClickLogOut } = useAuth();

  const item = React.useMemo(
    () => [
      {
        key: 1,
        label: <Link href={"/"}>Home</Link>,
      },
      !user
        ? {
            key: 2,
            label: <Link href={"/login"}>Login</Link>,
          }
        : null,
      user
        ? null
        : {
            key: 3,
            label: <Link href={"/register"}>Register</Link>,
          },
      user
        ? {
            key: 4,
            label: (
              <>
                <Avatar
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#f56a00",
                  }}
                />
                <span style={{ marginLeft: "10px" }}>{user}</span>
              </>
            ),
          }
        : null,
      user
        ? {
            key: 6,
            label: <div onClick={onClickLogOut}>Logout</div>,
          }
        : null,
    ],
    [user, onClickLogOut]
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          style={{ display: "flex", justifyContent: "space-between" }}
          theme="dark"
          mode="horizontal"
          items={item}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="main" style={{ background: colorBgContainer }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
