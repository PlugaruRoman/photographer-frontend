import { useQuery } from "react-query";
import { Card } from "antd";
import { PackagesService } from "@/api/offer";

export const PackagesExample = () => {
  const { data, isLoading } = useQuery("offer", PackagesService.getPackagesExample);

  return (
    <Card
      style={{ maxHeight: "600px", overflowY: "scroll" }}
      loading={isLoading}
      title="Offer example"
      bordered={false}
    >
      {data?.map((offer: any) => (
        <div key={offer.id}>{offer.value}</div>
      ))}
    </Card>
  );
};
