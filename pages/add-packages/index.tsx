import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Router from "next/router";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Space } from "antd";
import { useAuth } from "@/contextes/AuthContext/useAuth";

const PackagesForm = dynamic(() => import("@/components/organism/PackagesForm/PackagesForm"));
const PackagesExample = dynamic(() =>
  import("@/components/organism/PackagesExample/PackagesExample").then(
    (module) => module.PackagesExample,
  ),
);

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
