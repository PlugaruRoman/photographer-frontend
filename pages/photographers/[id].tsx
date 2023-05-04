import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticProps } from "next";

import { PhotographersService } from "@/api/photographers";
import { useRouter } from "next/router";
import PersonalGallery from "@/components/organism/PersonalGallery/PersonalGallery";
import PhotographerMain from "@/components/organism/PhotographerMain/PhotographerMain";
import { Alert, Divider, Skeleton, Space, Spin } from "antd";
import Link from "next/link";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { NavItems } from "@/types/enums";
import { spawn } from "child_process";
import NoProfile from "@/components/molecules/NoProfile/NoProfile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Photographer: React.FC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["profiles", query.id],
    PhotographersService.getPhotographer,
  );

  return (
    <>
      <Head>
        <title>Photographer</title>
      </Head>

      <section className="section">
        <Space direction="vertical" size="large">
          <Skeleton
            title
            style={{ backgroundColor: "#262b31", width: "700px" }}
            loading={isLoading}
            active
            avatar
            paragraph={{ rows: 7 }}
          >
            {!data && !isLoading ? (
              <Alert
                message={`${t("main:dear")} ${user?.username}`}
                description={<NoProfile />}
                type="info"
                showIcon
              />
            ) : (
              <PhotographerMain user={data} />
            )}
          </Skeleton>
        </Space>
      </section>
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "home", "layout", "main", "notification"],
        null,
        ["en", "ro", "ru"],
      )),
    },
  };
}

export default Photographer;
