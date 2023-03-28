import React from "react";
import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";
import { GetServerSidePropsContext } from "next";

import { PhotographersService } from "@/api/photographers";
import { IDehydratedSingle } from "@/types/Dehydrated";
import PersonalGallery from "@/components/organism/PersonalGallery/PersonalGallery";
import PhotographerMain from "@/components/organism/PhotographerMain/PhotographerMain";
import { Space } from "antd";

interface PhotographerProps {
  dehydratedState: IDehydratedSingle;
}

const Photographer: React.FC<PhotographerProps> = ({ dehydratedState }) => {
  const user = dehydratedState.queries[0].state.data.data;

  return (
    <>
      <Head>
        <title>Photographer</title>
      </Head>

      <section className="section">
        <Space direction="vertical" size="large">
          <PhotographerMain user={user.attributes} />
          <PersonalGallery />
        </Space>
      </section>
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
