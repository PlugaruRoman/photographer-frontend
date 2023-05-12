import React from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Alert, Skeleton, Space } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PhotographerMain from "@/components/organism/PhotographerMain/PhotographerMain";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import NoProfile from "@/components/molecules/NoProfile/NoProfile";
import { PhotographersService } from "@/api/photographers";
import { IPhotographerCard } from "@/types/photographer";

const Photographer = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { user } = useAuth();

  const { data, isLoading } = useQuery<IPhotographerCard>(
    ["profiles", query.id],
    PhotographersService.getPhotographer,
  );

  return (
    <>
      <Head>
        <title>Photographer</title>
      </Head>

      <section className="section">
        <Space className="photographer-main-content" direction="vertical" size="large">
          <Skeleton
            title
            className="photographer-main-skeleton"
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
        ["common", "home", "layout", "main", "notification", "sign"],
        null,
        ["en", "ro", "ru"],
      )),
    },
  };
}

export default Photographer;
