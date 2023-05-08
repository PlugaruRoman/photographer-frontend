import { PackagesService } from "@/api/offer";
import { Card } from "antd";
import React from "react";
import { useQuery } from "react-query";

export const PackagesExample: React.FC = () => {
  const { data, isLoading } = useQuery("offer", PackagesService.getPackagesExample);

  return (
    <div>
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
    </div>
  );
};
