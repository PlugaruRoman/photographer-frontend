import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import PackagesForm from "@/components/organism/PackagesForm/PackagesForm";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PackagesExample } from "@/components/organism/PackagesExample/PackagesExample";

const AddPackages: React.FC = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Add Packages</title>
      </Head>

      <section className="section">
        {user && (
          <Space direction="horizontal" align="baseline" size="large">
            <PackagesForm />
            <PackagesExample />
          </Space>
        )}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "layout", "notification"], null, [
        "en",
        "ro",
        "ru",
      ])),
    },
  };
};

export default AddPackages;
