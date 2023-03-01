import React from "react";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";
import { PhotographersService } from "@/api/photographers/photographers";
import { GetServerSidePropsContext } from "next";
import { IDehydratedSingle } from "@/types/Dehydrated";

interface PhotographerProps {
  dehydratedState: IDehydratedSingle;
}

const Photographer: React.FC<PhotographerProps> = ({ dehydratedState }) => {
  const user = React.useMemo(() => {
    return dehydratedState.queries[0].state.data.data.attributes;
  }, [dehydratedState]);

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>

      <main className="main-page">
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        </Badge.Ribbon>
        <div>{`${user.firstname} ${user.lastname}`}</div>
        <div>{user.city}</div>
        <div>{user.company}</div>
        <div>{user.about}</div>
        <div>{user.facebook}</div>
        <div>{user.instagram}</div>
        <div>+373 {user.phone}</div>
        <div>{user.price}</div>
        <div>{user.createdAt}</div>
      </main>
    </>
  );
};

export default Photographer;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["Photographer", id], PhotographersService.getPhotographer);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
