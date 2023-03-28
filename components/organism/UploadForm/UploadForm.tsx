import React from "react";
import { useMutation } from "react-query";
import { Button, Form, Image, Modal, Spin, Upload, notification } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import { UploadService } from "@/api/upload";
import { UploadButton } from "./molecules/UploadButton/UploadButton";
import { getBase64 } from "@/utils/getbase";

export const UploadForm: React.FC = () => {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onFinish = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj as RcFile);
      formData.append("ref", "myContentType");
      formData.append("field", "photo");
    });

    mutate(formData);
  };

  const { mutate, isLoading } = useMutation(UploadService.uploadPhoto, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      });
      setFileList([]);
    },
    onError: (e: any) => {
      notification.error({
        message: e.message,
      });
    },
  });

  return (
    <Spin tip="Loading..." spinning={isLoading} size="large">
      <Form name="upload-photo" onFinish={onFinish}>
        <Form.Item>
          <Upload
            action="http://localhost:3000/"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 12 ? null : <UploadButton />}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <Image alt="image" width={470} placeholder="blur" height={300} src={previewImage} />
          </Modal>
        </Form.Item>
        <Button type="default" size="large" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Spin>
  );
};
