import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "next-i18next";
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import { AuthService } from "@/api/auth";

import { Properties } from "@/types/properties";

interface RegisterModalProps {
  handleCancelRegister: any;
  isModalOpenRegister: any;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  handleCancelRegister,
  isModalOpenRegister,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const validateMessages = {
    required: t("notification:required"),
    types: {
      email: t("notification:valid_mail"),
    },
  };

  const onFinish = (values: Properties) => {
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
        message: t("notification:success"),
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
    <Modal
      title={t("sign:sign_up_account")}
      open={isModalOpenRegister}
      footer={null}
      onCancel={handleCancelRegister}
    >
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
            <Form.Item
              name={"username"}
              label={t("sign:name")}
              rules={[{ type: "string", required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              label={t("sign:email")}
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("sign:password")}
              name={"password"}
              rules={[
                {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/,
                  message: <>{t("notification:password")}</>,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                <Button loading={loading} size="large" type="default" htmlType="submit">
                  {t("layout:sign_up")}
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default RegisterModal;
