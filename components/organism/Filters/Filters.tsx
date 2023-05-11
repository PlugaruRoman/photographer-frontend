import { $Object } from "@/types/Object";
import { Button, Input, Select, Space } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type FiltersProps = {
  loadingCity: boolean;
  cities: $Object[];
};

export const Filters = ({ loadingCity, cities }: FiltersProps) => {
  const router = useRouter();

  const filterSearch = ({ search, city, price }: any) => {
    const { query } = router;

    if (search) query.search = search;
    if (city) query.city = city;
    if (price) query.price = price;

    router.push({ pathname: router.pathname, query: query });
  };

  const onSearch = (value: string) => {
    filterSearch({ search: value });
  };

  const onChangeCity = (e: string) => {
    filterSearch({ city: e });
  };

  const onSortPrice = (e: string) => {
    filterSearch({ price: e });
  };

  const onClickClear = () => {
    router.push({ pathname: router.pathname });
  };
  console.log(router?.query?.search);
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
        value={router?.query?.city?.toString()}
        placeholder={"sort by city"}
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
        loading={loadingCity}
        onChange={onChangeCity}
        options={cities}
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
  );
};
