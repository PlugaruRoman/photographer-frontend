import React from "react";
import Head from "next/head";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import CreatePhotographerForm from "@/components/organism/CreatePhotographerForm/CreatePhotographerForm";

const CreateProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Create Profile</title>
      </Head>

      <section className="section">
        {user && (
          <Space direction="vertical" align="center" size="large">
            <h2 className="title">{t("form:form_msg")}</h2>
            <CreatePhotographerForm />
          </Space>
        )}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "home", "layout", "sign", "form", "notification"],
        null,
        ["en", "ro", "ru"],
      )),
    },
  };
};

export default CreateProfile;
