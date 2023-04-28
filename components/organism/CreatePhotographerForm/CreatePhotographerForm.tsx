import React from "react";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Spin,
  notification,
} from "antd";

import { PhotographersService } from "@/api/photographers";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { CitiesService } from "@/api/cities";
import { IPhotographerForm } from "@/types/Photographer";

const CreatePhotographerForm: React.FC = () => {
  const [progress, setProgress] = React.useState(0);
  const router = useRouter();
  const { user } = useAuth();

  const onValuesChange = (_: any, allValues: any) => {
    const numInputs = Object.values(allValues).length;
    const numFilledInputs = Object.values(allValues).filter(
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

  const { data, isLoading } = useQuery("cities", CitiesService.getCities);

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) Router.push("/");
  }, [user]);

  const { mutate } = useMutation(PhotographersService.createPhotographer, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      }),
        router.push("/photographers");
    },
    onError: (e: any) => {
      console.log(e);
      notification.error({
        message: e.message,
      });
    },
  });
  console.log(user);
  const onFinish = (values: IPhotographerForm) => {
    mutate({
      firstname: values.firstname,
      lastname: values.lastname,
      company: values.company,
      city: values.city,
      price: values.price,
      about: values.about,
      phone: values.phone,
      facebook: values.facebook,
      instagram: values.instagram,
      web: values.web,
      user: user?.email,
      email: values.email,
    });
  };

  return (
    <>
      <h3 className="edit-user__text">
        <Progress className="edit-user__progress" percent={progress} />
        It is not obligatory to fill in all fields. Take the opportunity to fill in as many fields
        as possible and increase your chances of finding the right clients.
      </h3>
      <Form
        name="edit-user"
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row wrap justify="space-between">
          <Col className="form-block">
            <Form.Item name={"firstname"} rules={[{ required: true }]}>
              <Input placeholder="First name" />
            </Form.Item>

            <Form.Item name={"lastname"} rules={[{ required: true }]}>
              <Input placeholder="Last name" />
            </Form.Item>

            <Form.Item name={"email"} rules={[{ required: true }]}>
              <Input placeholder="email" />
            </Form.Item>

            <Form.Item name={"phone"}>
              <Input prefix="+373" placeholder="Phone number" />
            </Form.Item>

            <Spin spinning={false}>
              <Form.Item name={"city"} rules={[{ required: true }]}>
                <Select
                  showSearch
                  placeholder="Search City"
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
            <Form.Item name={"company"} label="Studio">
              <Input />
            </Form.Item>

            <Form.Item name={"price"} label="Price per hour">
              <InputNumber prefix="$" />
            </Form.Item>

            <Form.Item name={"about"} label="About me info">
              <Input.TextArea rows={6} />
            </Form.Item>
          </Col>
          <Col className="form-block">
            <Form.Item name={"facebook"} label={"Facebook"}>
              <Input placeholder="www.facebook.com/user" />
            </Form.Item>
            <Form.Item name={"instagram"} label={"Instagram"}>
              <Input placeholder="www.instagram.com/user" />
            </Form.Item>
            <Form.Item name={"web"} label={"web"}>
              <Input placeholder="www.user-website.com" />
            </Form.Item>
            <Button className="form-block__button" size="large" type="default" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreatePhotographerForm;
