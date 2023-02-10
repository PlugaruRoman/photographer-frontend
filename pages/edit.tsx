import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  UploadFile,
  notification,
} from "antd";
import { AuthService } from "@/api/auth/auth";
import TextArea from "antd/es/input/TextArea";
import { UsersService } from "@/api/users/users";

const fileList: UploadFile[] = [
  {
    uid: "0",
    name: "xxx.png",
    status: "uploading",
    percent: 33,
  },
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "-2",
    name: "zzz.png",
    status: "error",
  },
];

const data = {
  "Anenii Noi": "Anenii Noi",
  Bălți: "Bălți",
  Basarabeasca: "Basarabeasca",
  Bender: "Bender",
  Briceni: "Briceni",
  Cahul: "Cahul",
  Calarasi: "Calarasi",
  Cantemir: "Cantemir",
  Căușeni: "Căușeni",
  Chișinău: "Chișinău",
  Cimișlia: "Cimișlia",
  Criuleni: "Criuleni",
  Dondușeni: "Dondușeni",
  Drochia: "Drochia",
  Dubăsari: "Dubăsari",
  Edineț: "Edineț",
  Florești: "Florești",
  Fălești: "Fălești",
  Gagauzia: "Gagauzia",
  Glodeni: "Glodeni",
  Hîncești: "Hîncești",
  Ialoveni: "Ialoveni",
  Leova: "Leova",
  Nisporeni: "Nisporeni",
  Ocnița: "Ocnița",
  Orhei: "Orhei",
  Rezina: "Rezina",
  Rîbnița: "Rîbnița",
  Sîngerei: "Sîngerei",
  Soroca: "Soroca",
  Strășeni: "Strășeni",
  Șoldănești: "Șoldănești",
  Taraclia: "Taraclia",
  Telenești: "Telenești",
  Ungheni: "Ungheni",
  Slobozia: "Slobozia",
  "Ștefan Vodă": "Ștefan Vodă",
  Tighina: "Tighina",
  Tiraspol: "Tiraspol",
};

const EditUser: React.FC = () => {
  // const {
  //   data: { data },
  //   isLoading,
  // } = useQuery("all-cities", UsersService.getCities, {
  //   onSuccess: (data) => setOptions(data[0].attributes.cities),
  // });

  const selectItems = [...Object.keys(data)].map((i) => ({
    value: i,
    label: i,
  }));

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
      firstname: values.user.firstname,
      lastname: values.user.lastname,
      company: values.user.company,
      city: values.user.city,
      price: values.user.price,
      about: values.user.about,
      phone: values.user.phone,
      facebook: values.user.facebook,
      instagram: values.user.instagram,
      twitter: values.user.twitter,
      web: values.user.web,
    });
  };

  const { mutate } = useMutation(UsersService.updateUsers, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      }),
        router.push("/users");
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
        <title>Edit User</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <h1 style={{ margin: "0 auto", fontSize: "30px" }}>Edit User</h1>
        <Form
          {...layout}
          name="edit-user"
          onFinish={onFinish}
          style={{ maxWidth: 600, marginTop: "40px" }}
          validateMessages={validateMessages}
        >
          <div style={{ display: "flex" }}>
            <Form.Item name={["user", "firstname"]} label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={["user", "lastname"]} label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item name={["user", "company"]} label="Company Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name={["user", "city"]}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={selectItems}
            />
          </Form.Item>
          <Form.Item label="Price per hour" name={["user", "price"]}>
            <InputNumber prefix="$" defaultValue={"0"} />
          </Form.Item>
          <Form.Item label="TextArea" name={["user", "about"]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="social network">
              <Form.Item label="Phone" name={["user", "phone"]}>
                <Input prefix="+373" />
              </Form.Item>
              <h3>Social Network</h3>
              <Form.Item label={"Facebook"} name={["user", "facebook"]}>
                <Input />
              </Form.Item>
              <Form.Item label={"Instagram"} name={["user", "instagram"]}>
                <Input />
              </Form.Item>
              <Form.Item label={"Twitter"} name={["user", "twitter"]}>
                <Input />
              </Form.Item>
            </div>
            <Form.Item label={"Personal web"} name={["user", "web"]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditUser;
