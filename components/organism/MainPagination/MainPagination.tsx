import { Pagination, Row } from "antd";
import { useRouter } from "next/router";

type MainPaginationProps = {
  total?: number;
  limit?: number;
  page?: number;
};

export const MainPagination = ({ total, page, limit }: MainPaginationProps) => {
  const router = useRouter();

  const onChangePageSize = (current: number, size: number) => {
    const { query } = router;

    if (current) query.page = current.toString();
    if (size) query.limit = size.toString();

    router.push({ pathname: router.pathname, query: query });
  };

  return (
    <Row justify="end">
      <Pagination
        showSizeChanger
        onChange={onChangePageSize}
        total={total}
        showTotal={(total) => `Total ${total} photographers`}
        defaultPageSize={limit}
        defaultCurrent={page}
      />
    </Row>
  );
};
