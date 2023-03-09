import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Space } from "antd";

import { useAuth } from "@/contextes/AuthContext/useAuth";
import CreatePhotographerForm from "@/components/organism/CreatePhotographerForm/CreatePhotographerForm";

const CreateProfile: React.FC = () => {
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
            <h2 className="title">Create Photographer Profile</h2>
            <CreatePhotographerForm />
          </Space>
        )}
      </section>
    </>
  );
};

export default CreateProfile;
