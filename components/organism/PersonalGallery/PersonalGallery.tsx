import { useQuery } from "react-query";
import { Space, Image, Segmented } from "antd";

import { PhotographersService } from "@/api/photographers";
import { SegmentedValue } from "antd/es/segmented";

const PersonalGallery = () => {
  const { data, isLoading } = useQuery("theme-photo", PhotographersService.getCardPhoto);
  const [segmented, setSegmented] = React.useState("Couples");

  const onChange = (value: SegmentedValue) => {
    setSegmented(value.toString());
  };

  return (
    <Space size="large" align="center" direction="vertical" className="home-gallery">
      <Segmented
        onChange={onChange}
        value={segmented}
        size="large"
        options={["Couples", "Wedding", "Family"]}
      />

      <h1 className="title">Photography of a {segmented}: 6 100 MDL per hour minimum 1 hour</h1>

      <Space size="large" wrap align="center" className="space-justify__center">
        {isLoading
          ? "Loading..."
          : data.map((img: any) => (
              <div className="home-page__images" key={img.id}>
                <Image
                  placeholder="blur"
                  alt={img.name}
                  className="imagine"
                  width={320}
                  height={300}
                  src={`http://localhost:1337${img.url}`}
                  sizes="(max-width: 500px) 100px"
                />
              </div>
            ))}
      </Space>
    </Space>
  );
};

export default PersonalGallery;
