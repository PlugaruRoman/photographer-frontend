import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery } from "react-query";
import { Space, Spin } from "antd";

import PhotographerCard from "@/components/organism/PhotographerCard/PhotographerCard";
import { Filters } from "@/components/organism/Filters/Filters";
import { MainPagination } from "@/components/organism/MainPagination/MainPagination";
import { PhotographersService } from "@/api/photographers";
import { IResult } from "@/types/result";
import { defaultFilters } from "@/utils/filters";
import { IPhotographerCard } from "@/types/photographer";

const Photographers = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [filters, setFilters] = useState(defaultFilters);

  const { data, isLoading } = useQuery<IResult<IPhotographerCard>>(
    ["profiles", filters],
    PhotographersService.getPhotographers,
  );

  useEffect(() => {
    const { query } = router;
    setFilters({
      page: query?.page,
      limit: query?.limit,
      search: query?.search,
      country: query?.country,
      sort: query?.sort,
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Photographers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="section">
        <Space style={{ width: "1000px" }} size="large" direction="vertical">
          <h2 className="title">{t("photographers:photographer_msg")}</h2>
          <Filters />
          <Spin size="large" spinning={isLoading}>
            {data?.profiles.map((user) => (
              <PhotographerCard user={user} key={user._id} />
            ))}
          </Spin>
          <MainPagination total={data?.total} page={filters?.page} limit={filters?.limit} />
        </Space>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "home", "layout", "sign", "photographers", "notification", "form"],
        null,
        ["en", "ro", "ru"],
      )),
    },
  };
};

export default Photographers;
