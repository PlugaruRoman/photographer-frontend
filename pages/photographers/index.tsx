import React from "react";
import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";

import { PhotographersService } from "@/api/photographers/photographers";
import { PhotographerCard } from "@/components/organism/PhotographerCard/PhotographerCard";
import { IDehydrated } from "@/types/Dehydrated";
import { Space } from "antd";

interface PhotographersProps {
  dehydratedState: IDehydrated;
}

const Photographers: React.FC<PhotographersProps> = ({ dehydratedState }) => {
  return (
    <>
      <Head>
        <title>Photographers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="section">
        <Space size="large" direction="vertical">
          {dehydratedState.queries[0].state.data.data.map((user: any) => (
            <PhotographerCard info={user.attributes} id={user.id} key={user.id} />
          ))}
        </Space>
      </section>
    </>
  );
};

export default Photographers;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("all-Photographers", PhotographersService.getPhotographers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
