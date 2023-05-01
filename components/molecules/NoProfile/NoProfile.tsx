import { NavItems } from "@/types/enums";
import Link from "next/link";

const NoProfile: React.FC = () => {
  return (
    <>
      <p style={{ paddingTop: "20px" }}>
        We have noticed that you have not yet created a page on our platform. If you wish to do so,
        we kindly invite you to follow this
        <Link href={NavItems.CREATE_PROFILE}> Link</Link> to start the page creation process.
      </p>
      <p style={{ paddingTop: "20px" }}>
        If you encounter any issues or require any assistance in creating your page, please do not
        hesitate to contact us. We are always here to support you and help you succeed.
      </p>
      <p style={{ paddingTop: "20px" }}>
        Thank you for choosing our platform, and we look forward to seeing your page.
      </p>
      <p style={{ paddingTop: "20px" }}>Best regards,</p>
      <p>Moments-App</p>
    </>
  );
};

export default NoProfile;
