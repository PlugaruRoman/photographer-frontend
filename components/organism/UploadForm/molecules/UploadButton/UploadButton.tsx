import { useTranslation } from "next-i18next";
import { PlusOutlined } from "@ant-design/icons";

export const UploadButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PlusOutlined />
      <div>{t("upload:upload")}</div>
    </div>
  );
};
