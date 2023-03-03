import { useQuery } from "react-query";
import { Button, Space, Image } from "antd";

import { PhotographersService } from "@/api/photographers/photographers";

const PersonalGallery: React.FC = () => {
  const { data, isLoading } = useQuery("all-photo", PhotographersService.getPhoto);

  return (
    <Space size="large" align="center" direction="vertical" className="home-gallery">
      <Space size="large">
        <Button size="large" type="default">
          Couples
        </Button>
        <Button size="large" type="default">
          Weeding
        </Button>
        <Button size="large" type="default">
          Family
        </Button>
      </Space>
      <h1 className="title">The best wedding and family photos of the week</h1>

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
