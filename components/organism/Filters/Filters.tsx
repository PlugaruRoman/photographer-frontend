import { CountryService } from "@/api/country";
import { Button, Input, Select, Space } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

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
    <Space>
      <Input.Search
        size="large"
        onSearch={onSearch}
        value={router?.query?.search}
        placeholder="search photographer"
      />
      <Select
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
          { value: "price", label: "desc" },
        ]}
      />
      <Button onClick={onClickClear} size="large">
        Clear filters
      </Button>
    </Space>
  );
};
