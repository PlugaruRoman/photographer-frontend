import React from "react";
import Head from "next/head";
import { QueryClient, dehydrate, useQuery } from "react-query";
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
  console.log(dehydratedState.queries[0].state.data);
  return (
    <>
      <Head>
        <title>Photographer</title>
      </Head>

      <section className="section">
        <Space direction="vertical" size="large">
          <PhotographerMain user={dehydratedState.queries[0].state.data} />
          {/* <PersonalGallery /> */}
        </Space>
      </section>
    </>
  );
};

export default Photographer;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["photographer", id], PhotographersService.getPhotographer);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
