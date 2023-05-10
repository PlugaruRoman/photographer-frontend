import React from "react";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import Marquee from "react-fast-marquee";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PhotographersService } from "@/api/photographers";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { CitiesService } from "@/api/cities";
import { IPhotographerForm } from "@/types/Photographer";

const URL = process.env.NEXT_PUBLIC_FS_URL;

const CreatePhotographerForm: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [updateId, setUpdateId] = React.useState("");

  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const handleChange: UploadProps["onChange"] = ({ file }) =>
    form.setFieldsValue({ avatar: file?.response?.url });

  const onValuesChange = (_: any, allValues: any) => {
    const numInputs = Object.values(allValues).length;
    const numFilledInputs = Object.values(allValues).filter(
      (value) => value !== undefined && value !== "" && value !== null,
    ).length;
    const newProgress = Math.floor((numFilledInputs / numInputs) * 100);
    setProgress(newProgress);
  };

  const validateMessages = {
    required: t("notification:required"),
    types: {
      email: t("notification:valid_mail"),
    },
  };

  const { data, isLoading } = useQuery("cities", CitiesService.getCities);

  useQuery(["photograph", user?.id], PhotographersService.getPhotographer, {
    enabled: !!user?.id,
    onSuccess: (data) => {
      form.setFieldsValue({
        firstname: data?.firstname,
        lastname: data?.lastname,
        company: data?.company,
        city: data?.city,
        price: data?.price,
        hour: data?.hour,
        about: data?.about,
        phone: data?.phone,
        facebook: data?.facebook,
        instagram: data?.instagram,
        web: data?.web,
        user: data?.id,
        email: data?.email,
        twitter: data?.twitter,
        avatar: data?.avatar,
      });
      setUpdateId(data?._id);
    },
  });

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  const { mutate } = useMutation(
    updateId ? PhotographersService.updatePhotographer : PhotographersService.createPhotographer,
    {
      onSuccess: () => {
        notification.success({
          message: t("notification:success"),
        }),
          router.push("/photographers");
      },
      onError: (e: any) => {
        if (e?.response?.data?.message.includes("duplicate key error collection")) {
          notification.error({
            message: t("notification:mail_exist"),
          });
        } else {
          notification.error({
            message: e.message,
          });
        }
      },
    },
  );

  const onFinish = (values: IPhotographerForm) => {
    mutate({
      _id: updateId,
      firstname: values?.firstname,
      lastname: values?.lastname,
      company: values?.company,
      city: values?.city,
      price: values?.price,
      hour: values?.hour,
      about: values?.about,
      phone: values?.phone,
      facebook: values?.facebook,
      instagram: values?.instagram,
      web: values?.web,
      twitter: values?.twitter,
      user: user?.id,
      email: values?.email,
      avatar: values?.avatar,
    });
  };

  return (
    <>
      <Space className="edit-user__progress" direction="vertical">
        <Progress percent={progress} />
        <Alert
          className="edit-user__alert"
          banner
          closable
          type="info"
          message={
            <Marquee pauseOnHover gradient={false}>
              {t("form:information")}
            </Marquee>
          }
        />
      </Space>

      <Form
        form={form}
        name="edit-user"
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        layout="vertical"
        validateMessages={validateMessages}
      >
        <Row justify="space-between">
          <Col className="form-block">
            <Form.Item name={"firstname"} label={t("form:first_name")} rules={[{ required: true }]}>
              <Input placeholder={t("form:first_name") || "first name"} />
            </Form.Item>

            <Form.Item name={"lastname"} label={t("form:last_name")} rules={[{ required: true }]}>
              <Input placeholder={t("form:last_name") || "last name"} />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={t("form:email")}
              rules={[{ type: "email", required: true }]}
            >
              <Input placeholder={t("form:email") || "email"} />
            </Form.Item>

            <Form.Item label={t("form:phone")} name={"phone"}>
              <Input prefix="+373" placeholder={t("form:phone") || "phone"} />
            </Form.Item>

            <Spin spinning={false}>
              <Form.Item label={t("form:search_city")} name={"city"}>
                <Select
                  showSearch
                  placeholder={t("form:search_city") || "select city"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toString()
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toString().toLowerCase())
                  }
                  loading={isLoading}
                  options={data}
                />
              </Form.Item>
            </Spin>
          </Col>
          <Col className="form-block">
            <Form.Item name={"company"} label={t("form:studio")}>
              <Input />
            </Form.Item>

            <Space>
              <Form.Item name={"price"} label={t("form:per_hour")}>
                <InputNumber min={0} prefix="$" />
              </Form.Item>
              <Form.Item name={"hour"} label={t("form:minimal")}>
                <InputNumber min={0} placeholder="hour" />
              </Form.Item>
            </Space>

            <Form.Item name={"about"} label={t("form:about_me")}>
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name={"avatar"} label={t("form:avatar")}>
              <Upload
                name="avatar"
                action={`${URL}/api/upload`}
                listType="text"
                onChange={handleChange}
                maxCount={1}
              >
                <Button size="large" icon={<UploadOutlined />}>
                  {t("form:upload_btn")}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col className="form-block">
            <Form.Item
              name={"facebook"}
              label={t("form:facebook")}
              rules={[{ type: "url", warningOnly: true }]}
            >
              <Input placeholder="www.facebook.com/user" />
            </Form.Item>
            <Form.Item
              name={"instagram"}
              label={t("form:instagram")}
              rules={[{ type: "url", warningOnly: true }]}
            >
              <Input placeholder="www.instagram.com/user" />
            </Form.Item>
            <Form.Item
              name={"twitter"}
              label={t("form:twitter")}
              rules={[{ type: "url", warningOnly: true }]}
            >
              <Input placeholder="twitter.com/user" />
            </Form.Item>

            <Form.Item
              name={"web"}
              label={t("form:web")}
              rules={[{ type: "url", warningOnly: true }]}
            >
              <Input placeholder="www.user-website.com" />
            </Form.Item>
            <Button className="form-block__button" size="large" type="default" htmlType="submit">
              {t("form:submit")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreatePhotographerForm;
