import Link from "next/link";
import { MoreOutlined } from "@ant-design/icons";

interface ExtraContentProps {
  id: number;
}

const ExtraContent: React.FC<ExtraContentProps> = ({ id }) => {
  return (
    <Link href={`/photographers/${id}/`} className="photographer-card__more-info">
      <span>More Info</span>
      <MoreOutlined />
    </Link>
  );
};

export default ExtraContent;
