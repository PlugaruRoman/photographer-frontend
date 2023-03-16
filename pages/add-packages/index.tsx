import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import PackagesForm from "@/components/organism/PackagesForm/PackagesForm";

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
          <Space direction="vertical" align="center" size="large">
            <PackagesForm />
          </Space>
        )}
      </section>
    </>
  );
};

export default AddPackages;
