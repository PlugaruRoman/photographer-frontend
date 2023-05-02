import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import { UploadForm } from "@/components/organism/UploadForm/UploadForm";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UploadPhoto: React.FC = () => {
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
            <h2 className="title">Upload photo</h2>
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
      ...(await serverSideTranslations(locale, ["common", "home", "layout", "sign"], null, [
        "en",
        "ro",
        "ru",
      ])),
    },
  };
};

export default UploadPhoto;
