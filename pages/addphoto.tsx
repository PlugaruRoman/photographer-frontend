import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Button, Form, Input, Select, Modal, Upload, notification } from "antd";
import { AuthService } from "@/api/auth/auth";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import Image from "next/image";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddPhoto: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const router = useRouter();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values: any) => {
    mutate({
      username: values.user.name,
      email: values.user.email,
      password: values.user.password,
    });
  };

  const { mutate } = useMutation(AuthService.createUser, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      }),
        router.push("/login");
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1 style={{ margin: "0 auto", fontSize: "30px" }}>Add Photo</h1>
        <Form
          {...layout}
          name="edit-user"
          onFinish={onFinish}
          style={{ margin: "40px auto" }}
          validateMessages={validateMessages}
        >
          <Form.Item name={["user", "Photo"]}>
            <Upload
              action="http://localhost:3000/"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <Image alt="example" width={470} height={300} src={previewImage} />
            </Modal>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddPhoto;
