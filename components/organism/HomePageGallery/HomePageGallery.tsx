import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { PhotographersService } from "@/api/photographers/photographers";

const HomePageGallery: React.FC = () => {
  const { data, isLoading } = useQuery("all-photo", PhotographersService.getPhoto);

  return (
    <Space size="large" align="center" direction="vertical" className="home-gallery">
      <h1 className="title">The best wedding and family photos of the week</h1>

      <Space size="large" wrap align="center" className="space-justify__center">
        {isLoading
          ? "Loading..."
          : data.map((img: any) => (
              <div className="home-page__images" key={img.id}>
                <div className="home-page__users">
                  <Link href="/photographers/10">
                    <Avatar size={64} icon={<UserOutlined />} />
                    <span className="gallery-user">User Name</span>
                  </Link>
                </div>
                <Link href="/photographers/10">
                  <Image
                    placeholder="blur"
                    alt={img.name}
                    className="imagine"
                    width={320}
                    height={300}
                    blurDataURL={`http://localhost:1337${img.url}`}
                    src={`http://localhost:1337${img.url}`}
                    sizes="(max-width: 500px) 100px"
                  />
                </Link>
              </div>
            ))}
      </Space>
    </Space>
  );
};

export default HomePageGallery;
