import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, notification } from "antd";
import { useMutation } from "react-query";
import { useAuth } from "@/contextes/AuthContext/useAuth";
import { PackagesService } from "@/api/offer";
import { PackagesForm } from "@/types/Packages";
import { $Object } from "@/types/Object";

export interface PackagesFormProps {
  packages: $Object[];
}

const PackagesForm: React.FC<PackagesFormProps> = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const { mutate } = useMutation(PackagesService.createPackage, {
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      });
      form.resetFields();
    },
    onError: (e: any) => {
      notification.error({
        message: e.message,
      });
    },
  });

  const onFinish = (value: PackagesFormProps) => {
    mutate({
      value: value.packages,
      user: user?.id,
    });
  };

  return (
    <Form
      form={form}
      name="packages-form"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      autoComplete="off"
    >
      <Form.List name="packages">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Form.Item
                  style={{ width: "500px" }}
                  {...restField}
                  name={[name]}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Package" />
                </Form.Item>

                <MinusCircleOutlined
                  style={{ color: "#ea6042", fontSize: "20px" }}
                  onClick={() => remove(name)}
                />
              </Space>
            ))}
            <Form.Item>
              {fields.length <= 7 ? (
                <Button
                  type="default"
                  style={{ width: "500px" }}
                  size="large"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              ) : null}
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button size="large" type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackagesForm;
