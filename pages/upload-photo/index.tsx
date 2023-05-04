import React from "react";
import Head from "next/head";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import { UploadForm } from "@/components/organism/UploadForm/UploadForm";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UploadPhoto: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Upload Photo</title>
      </Head>

      <section className="section">
        {user && (
          <Space direction="vertical" align="center" size="large">
            <h2 className="title">{t("upload:upload_photos")}</h2>
            <h2 style={{ color: "#ffffff" }}>{t("upload:upload_msg")}</h2>
            <UploadForm />
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
        ["common", "layout", "upload", "notification"],
        null,
        ["en", "ro", "ru"],
      )),
    },
  };
};

export default UploadPhoto;
