import React from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useMutation } from "react-query";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Space,
  notification,
} from "antd";

import { PhotographersService } from "@/api/photographers/photographers";
import { useAuth } from "@/contextes/AuthContext/useAuth";

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
  const [progress, setProgress] = React.useState(0);
  const router = useRouter();
  const { user } = useAuth();

  const selectItems = [...Object.keys(data)].map((i) => ({
    value: i,
    label: i,
  }));

  const onValuesChange = (changedValues: any, allValues: any) => {
    const numInputs = Object.keys(allValues.user).length;
    const numFilledInputs = Object.values(allValues.user).filter(
      (value) => value !== undefined && value !== "",
    ).length;
    const newProgress = Math.floor((numFilledInputs / numInputs) * 100);
    setProgress(newProgress);
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

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  const { mutate } = useMutation(PhotographersService.updatePhotographers, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      }),
        router.push("/photographers");
    },
    onError: (e: any) => {
      notification.error({
        message: e.message,
      });
    },
  });

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
      web: values.user.web,
      user: user,
      email: values.user.email,
    });
  };

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>

      <section className="section">
        {user && (
          <Space className="edit-user" direction="vertical" align="center" size="large">
            <h1 className="title">Create Photographer Profile</h1>

            <h3 className="edit-user__text">
              <Progress className="edit-user__progress" percent={progress} />
              It is not obligatory to fill in all fields. Take the opportunity to fill in as many
              fields as possible and increase your chances of finding the right clients.
            </h3>
            <Form
              name="edit-user"
              onValuesChange={onValuesChange}
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Row wrap justify="space-between">
                <Col className="form-block">
                  <Form.Item name={["user", "firstname"]} rules={[{ required: true }]}>
                    <Input placeholder="First name" />
                  </Form.Item>

                  <Form.Item name={["user", "lastname"]} rules={[{ required: true }]}>
                    <Input placeholder="Last name" />
                  </Form.Item>

                  <Form.Item name={["user", "email"]} rules={[{ required: true }]}>
                    <Input placeholder="email" />
                  </Form.Item>

                  <Form.Item name={["user", "phone"]}>
                    <Input prefix="+373" placeholder="Phone number" />
                  </Form.Item>

                  <Form.Item name={["user", "city"]} rules={[{ required: true }]}>
                    <Select
                      showSearch
                      placeholder="Search City"
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
                </Col>
                <Col className="form-block">
                  <Form.Item name={["user", "company"]} label="Studio">
                    <Input />
                  </Form.Item>

                  <Form.Item name={["user", "price"]} label="Price per hour">
                    <InputNumber prefix="$" defaultValue={"0"} />
                  </Form.Item>

                  <Form.Item name={["user", "about"]} label="About me info">
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col className="form-block">
                  <Form.Item name={["user", "facebook"]} label={"Facebook"}>
                    <Input placeholder="https://www.facebook.com/user" />
                  </Form.Item>

                  <Form.Item name={["user", "instagram"]} label={"Instagram"}>
                    <Input placeholder="www.instagram.com/user" />
                  </Form.Item>

                  <Form.Item name={["user", "web"]} label={"web"}>
                    <Input placeholder="www.user-website.com" />
                  </Form.Item>
                  <Button
                    style={{ marginTop: "70px" }}
                    size="large"
                    type="default"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Space>
        )}
      </section>
    </>
  );
};

export default EditUser;
