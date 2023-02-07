import Head from "next/head";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { UsersService } from "@/api/users/users";
import { UserCard } from "@/components/UserCard/UserCard";
import { Spin } from "antd";

const Users: React.FC = () => {
  const { data, isLoading } = useQuery("all-users", UsersService.getUsers);

  return (
    <>
      <Head>
        <title>Users Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          padding: "30px 0px 30px 0px",
          backgroundColor: "#d9d9d9",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Spin tip="Loading" size="large" />
        ) : (
          data.map((user: any) => <UserCard info={user} key={user.id} />)
        )}
      </main>
    </>
  );
};

export default Users;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("all-users", UsersService.getUsers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
