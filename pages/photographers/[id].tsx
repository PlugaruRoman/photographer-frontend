import React from "react";
import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";
import { GetServerSidePropsContext } from "next";

import { PhotographersService } from "@/api/photographers/photographers";

import { IDehydratedSingle } from "@/types/Dehydrated";
import PersonalGallery from "@/components/organism/PersonalGallery/PersonalGallery";
import PhotographerMain from "@/components/organism/PhotographerMain/PhotographerMain";

interface PhotographerProps {
  dehydratedState: IDehydratedSingle;
}

const Photographer: React.FC<PhotographerProps> = ({ dehydratedState }) => {
  const user = dehydratedState.queries[0].state.data.data;

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>

      <section className="section">
        <PhotographerMain user={user.attributes} />
        <PersonalGallery />
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
