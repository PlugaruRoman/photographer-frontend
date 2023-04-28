import React from "react";
import { useMutation } from "react-query";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { AuthService } from "@/api/auth";
import { IRegisterInputs } from "@/types/Register";

interface RegisterModalProps {
  handleCancelRegister: any;
  isModalOpenRegister: any;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  handleCancelRegister,
  isModalOpenRegister,
}) => {
  const [loading, setLoading] = React.useState(false);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onFinish = (values: IRegisterInputs) => {
    setLoading(true);
    mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  const { mutate } = useMutation(AuthService.createUser, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      });
      handleCancelRegister();
      setLoading(false);
    },
    onError: (e: any) => {
      notification.error({
        message: e.response.data.message,
      });
      setLoading(false);
    },
  });

  return (
    <Modal title="Sign up" open={isModalOpenRegister} footer={null} onCancel={handleCancelRegister}>
      <Row justify={"center"} align={"middle"}>
        <Col span={24}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            name="basic"
            onFinish={onFinish}
            validateMessages={validateMessages}
            autoComplete="off"
          >
            <Form.Item name={"username"} label="Name" rules={[{ type: "string", required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"email"} label="Email" rules={[{ type: "email", required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/,
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be 8-24 characters long",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 17, span: 16 }}>
              <Button loading={loading} size="large" type="default" htmlType="submit">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default RegisterModal;
