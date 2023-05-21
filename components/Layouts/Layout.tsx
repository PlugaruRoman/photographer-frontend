import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useMutation } from "react-query";
import { Layout, Menu, Select } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  LoginOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { Auth, NavItems } from "@/types/enums";
import { AuthService } from "@/api/auth";

const LoginModal = dynamic(() => import("../molecules/LoginModal/LoginModal"));
const RegisterModal = dynamic(() => import("../molecules/RegisterModal/RegisterModal"));

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation("layout");
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);

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

  const onChangeLanguage = useMemo(
    () => (l: string) => {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: l });
    },
    [router],
  );

  const { mutate } = useMutation(AuthService.logoutUser, {
    onSuccess: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("Token");
      setUser(undefined);
    },
  });

  const onClickLogOut = useCallback(() => mutate(), [mutate]);

  const item = [
    {
      key: NavItems.HOME,
      label: <Link href={NavItems.HOME}>{t("layout:home")}</Link>,
    },
    {
      key: NavItems.PHOTOGRAPHERS,
      label: <Link href={NavItems.PHOTOGRAPHERS}>{t("layout:photographers")}</Link>,
    },
  ];

  const itemRight = useMemo(
    () => [
      !user
        ? {
            key: Auth.REGISTER,
            label: <div onClick={showModalRegister}>{t("layout:sign_up")}</div>,
          }
        : null,

      !user
        ? {
            key: Auth.LOGIN,
            label: <div onClick={showModalLogin}>{t("layout:sign_in")}</div>,
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
                label: <Link href={NavItems.MY_PAGE + user.id}>{t("layout:my_page")}</Link>,
              },
              {
                key: NavItems.CREATE_PROFILE,
                icon: <UserOutlined />,
                label: <Link href={NavItems.CREATE_PROFILE}>{t("layout:create_profile")}</Link>,
              },
              {
                key: NavItems.UPLOAD_PHOTO,
                icon: <CameraOutlined />,
                label: <Link href={NavItems.UPLOAD_PHOTO}>{t("layout:upload_photo")}</Link>,
              },
              {
                key: NavItems.ADD_PACKAGES,
                icon: <UnorderedListOutlined />,
                label: <Link href={NavItems.ADD_PACKAGES}>{t("layout:add_packages")}</Link>,
              },
              {
                key: Auth.LOGOUT,
                icon: <LoginOutlined onClick={onClickLogOut} />,
                label: <span onClick={onClickLogOut}>{t("layout:logout")}</span>,
              },
            ],
          }
        : null,
      {
        key: "language",
        label: (
          <Select
            onChange={onChangeLanguage}
            defaultValue={router.locale}
            options={router.locales?.map((local: any) => ({ value: local, label: local }))}
          />
        ),
      },
    ],
    [user, onClickLogOut, router, t, onChangeLanguage],
  );

  return (
    <Layout className="layout">
      <Layout>
        <Header className="header">
          <Menu
            theme="light"
            className="header-menu"
            selectedKeys={[router.pathname]}
            mode="horizontal"
            items={item}
            activeKey={router.pathname}
          />

          <div>LOGO</div>
          <Menu
            theme="light"
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
        <Footer className="footer">Moments-app ©2023 Created by RP</Footer>
      </Layout>
    </Layout>
  );
};
