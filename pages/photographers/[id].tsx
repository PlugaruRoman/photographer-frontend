import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Head from "next/head";
import { QueryClient, dehydrate } from "react-query";
import { PhotographersService } from "@/api/photographers/photographers";
import { GetServerSidePropsContext } from "next";
import { IDehydrated } from "@/types/Dehydrated";

interface PhotographerProps {
  dehydratedState: IDehydrated;
}

const Photographer: React.FC<PhotographerProps> = ({ dehydratedState }) => {
  console.log(dehydratedState.queries[0]);

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <main className="main-page">
        <Badge.Ribbon color="gold" text="Pro">
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        </Badge.Ribbon>
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
