import Link from "next/link";
import { useTranslation } from "next-i18next";
import { NavItems } from "@/types/enums";

const NoProfile = () => {
  const { t } = useTranslation();
  return (
    <>
      <p style={{ paddingTop: "20px" }}>
        {t("main:msg_one")}
        <Link href={NavItems.CREATE_PROFILE}> {t("main:link")}</Link> {t("main:msg_four")}
      </p>
      <p style={{ paddingTop: "20px" }}>{t("main:msg_two")}</p>
      <p style={{ paddingTop: "20px" }}>{t("main:msg_three")}</p>
      <p style={{ paddingTop: "20px" }}>{t("main:regards")}</p>
      <p>Moments-App</p>
    </>
  );
};

export default NoProfile;
