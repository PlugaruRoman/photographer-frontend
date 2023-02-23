import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useMutation } from "react-query";
import { Button, Form, Modal, Space, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import { PhotographersService } from "@/api/photographers/photographers";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddPhoto: React.FC = () => {
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );

  const onFinish = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj as RcFile);
      formData.append("ref", "myContentType");
      formData.append("field", "photo");
    });

    mutate(formData);
  };

  const { mutate } = useMutation(PhotographersService.uploadPhoto, {
    onSuccess: () => {
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

  return (
    <>
      <Head>
        <title>Add Photo</title>
      </Head>

      <main className="main-page">
        <Space direction="vertical" align="center" size="large">
          <h1 className="title">Add Photo</h1>

          <Form name="upload-photo" onFinish={onFinish}>
            <Form.Item name={["user", "Photo"]}>
              <Upload
                action="http://localhost:3000/"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 12 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image alt="image" width={470} height={300} src={previewImage} />
              </Modal>
            </Form.Item>
            <Button type="default" size="large" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Space>
      </main>
    </>
  );
};

export default AddPhoto;
