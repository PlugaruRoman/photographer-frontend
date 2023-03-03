import React from "react";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useMutation } from "react-query";
import { Button, Form, Modal, Space, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import { PhotographersService } from "@/api/photographers/photographers";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { getBase64 } from "@/utils/getbase";

const AddPhoto: React.FC = () => {
  const { user } = useAuth();
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

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

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

      <section className="section">
        {user && (
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
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <Image
                    alt="image"
                    width={470}
                    placeholder="blur"
                    height={300}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
              <Button type="default" size="large" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Space>
        )}
      </section>
    </>
  );
};

export default AddPhoto;
