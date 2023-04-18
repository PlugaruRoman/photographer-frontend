import React from "react";
import { useMutation } from "react-query";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { AuthService } from "@/api/auth";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { ILoginInputs } from "@/types/Login";

interface LoginModalProps {
  handleCancel: any;
  isModalOpen: any;
}

const LoginModal: React.FC<LoginModalProps> = ({ handleCancel, isModalOpen }) => {
  const { setUser } = useAuth();

  const onFinish = (values: ILoginInputs) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  const { mutate } = useMutation(AuthService.loginUser, {
    onSuccess: (res) => {
      // localStorage.setItem("user", res.config.data);
      // localStorage.setItem("Token", res.data.jwt);
      // setUser(JSON.parse(res.config.data).identifier);
      notification.success({
        message: "Successfully",
      });

      handleCancel();
    },
    onError: () => {
      notification.error({
        message: "Error!",
        description: `The username or password is incorrect`,
      });
    },
  });

  return (
    <Modal title="Sign in" open={isModalOpen} footer={null} onCancel={handleCancel}>
      <Row justify={"center"} align={"middle"}>
        <Col span={24}>
          <Form
            name="login"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 17, span: 16 }}>
              <Button size="large" type="default" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
