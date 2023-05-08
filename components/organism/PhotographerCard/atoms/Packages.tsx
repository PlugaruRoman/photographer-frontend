import { useQuery } from "react-query";
import { Space, Spin } from "antd";
import { PackagesService } from "@/api/offer";

interface PackagesProps {
  user: string;
}

export const Packages: React.FC<PackagesProps> = ({ user }) => {
  const { data, isLoading } = useQuery(["offer", user], PackagesService.getPackage);

  return (
    <Space direction="vertical">
      <Spin size="large" spinning={isLoading}>
        {data?.value.map((offer: any, i: number) => (
          <div key={i}>{offer}</div>
        ))}
      </Spin>
    </Space>
  );
};
