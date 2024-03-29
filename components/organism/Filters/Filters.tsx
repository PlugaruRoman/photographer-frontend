import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Button, Card, Input, Select, Space } from "antd";
import { CountryService } from "@/api/country";

export const Filters = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(["country"], CountryService.getCountries);

  const filterSearch = ({ search, country, sort }: any) => {
    const { query } = router;

    if (search) query.search = search;
    if (country) query.country = country;
    if (sort) query.sort = sort;

    router.push({ pathname: router.pathname, query: query });
  };

  const onSearch = (value: string) => {
    filterSearch({ search: value });
  };

  const onChangeCountry = (e: string) => {
    filterSearch({ country: e });
  };

  const onSortPrice = (e: string) => {
    filterSearch({ sort: e });
  };

  const onClickClear = () => {
    router.push({ pathname: router.pathname });
  };

  return (
    <Card bordered={false}>
      <Space>
        <Input.Search
          style={{ width: "250px" }}
          size="large"
          onSearch={onSearch}
          value={router?.query?.search}
          placeholder="search photographer"
        />
        <Select
          style={{ width: "250px" }}
          size="large"
          showSearch
          value={router?.query?.country?.toString()}
          placeholder={"sort by country"}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toString().toLowerCase())
          }
          loading={isLoading}
          onChange={onChangeCountry}
          options={data}
        />
        <Select
          size="large"
          placeholder="sort by price"
          value={router?.query?.price?.toString()}
          onChange={onSortPrice}
          options={[
            { value: "asc", label: "asc" },
            { value: "desc", label: "desc" },
          ]}
        />
        <Button onClick={onClickClear} size="large">
          Clear filters
        </Button>
      </Space>
    </Card>
  );
};
