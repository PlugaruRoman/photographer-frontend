import React from "react";
import { useTranslation } from "next-i18next";
import { useMutation } from "react-query";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { AuthService } from "@/api/auth";
import { useAuth } from "@/contextes/AuthContext/useAuth";

import { Properties } from "@/types/properties";

interface LoginModalProps {
  handleCancel: any;
  isModalOpen: any;
}

const LoginModal: React.FC<LoginModalProps> = ({ handleCancel, isModalOpen }) => {
  const { t } = useTranslation();
  const { setUser } = useAuth();

  const validateMessages = {
    required: t("notification:required"),
    types: {
      email: t("notification:valid_mail"),
    },
  };

  const onFinish = (values: Properties) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  const { mutate } = useMutation(AuthService.loginUser, {
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("Token", res.data.accessToken);
      setUser(res.data.user);
      notification.success({
        message: t("notification:success"),
      });
      handleCancel();
    },
    onError: ({ response }) => {
      notification.error({
        message: "Error!",
        description: response?.data?.message,
      });
    },
  });

  return (
    <Modal title={t("sign:sign_in")} open={isModalOpen} footer={null} onCancel={handleCancel}>
      <Row justify={"center"} align={"middle"}>
        <Col span={24}>
          <Form
            name="login"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Form.Item
              label={t("sign:email")}
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={t("sign:password")} name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                <Button size="large" type="default" htmlType="submit">
                  {t("layout:sign_in")}
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
