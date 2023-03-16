import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, notification } from "antd";
import { useMutation } from "react-query";
import { PackagesService } from "@/api/offer/offer";

const PackagesForm: React.FC = () => {
  const [form] = Form.useForm();

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

  const onFinish = (values: any) => {
    mutate({
      package: values.packages[0]?.package,
      package1: values.packages[1]?.package,
      package2: values.packages[2]?.package,
      package3: values.packages[3]?.package,
      package4: values.packages[4]?.package,
      package5: values.packages[5]?.package,
      package6: values.packages[6]?.package,
      package7: values.packages[7]?.package,
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
                  name={[name, "package"]}
                  rules={[{ required: true, message: "Missing first name" }]}
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
