import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "next-i18next";
import { Button, Form, Image, Modal, Spin, Upload, notification } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import { UploadService } from "@/api/upload";
import { UploadButton } from "./molecules/UploadButton/UploadButton";
import { getBase64 } from "@/utils/getbase";

export const UploadForm: React.FC = () => {
  const { t } = useTranslation();

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile>();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChange: UploadProps["onChange"] = async ({ file }) => {
    const base64 = await getBase64(file.originFileObj as RcFile);
  };

  const onFinish = () => {
    // const formData = new FormData();
    // formData.append("avatar", fileList!.originFileObj as RcFile);
    // mutate(formData);
  };

  const { mutate, isLoading } = useMutation(UploadService.uploadPhoto, {
    onSuccess: (res) => {
      console.log(res);
      notification.success({
        message: "Successfully",
      });
    },
    onError: (e: any) => {
      notification.error({
        message: e.message,
      });
    },
  });
  console.log(fileList);
  return (
    <Spin tip="Loading..." spinning={isLoading} size="large">
      <Form name="upload-photo" onFinish={onFinish}>
        <Upload
          name="avatar"
          action={`${process.env.NEXT_PUBLIC_FS_URL}/api/upload`}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={5}
          multiple={true}
        >
          <UploadButton />
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <Image alt="image" width={470} placeholder="blur" height={300} src={previewImage} />
        </Modal>
        <Button type="default" size="large" htmlType="submit">
          {t("upload:submit")}
        </Button>
      </Form>
    </Spin>
  );
};
