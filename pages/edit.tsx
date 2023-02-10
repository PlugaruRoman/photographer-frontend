import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
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

const selectItems = [
  {
    value: "City 1",
    label: "City 1",
  },
  {
    value: "City 2",
    label: "City 2",
  },
  {
    value: "City 3",
    label: "City 3",
  },
  {
    value: "City 4",
    label: "City 4",
  },
  {
    value: "City 5",
    label: "City 5",
  },
  {
    value: "City 6",
    label: "City 6",
  },
];

const EditUser: React.FC = () => {
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
    // mutate({
    //   username: values.user.name,
    //   email: values.user.email,
    //   password: values.user.password,
    // });
    console.log(values);
  };

  // const { mutate } = useMutation(AuthService.createUser, {
  //   onSuccess: () => {
  //     notification.success({
  //       message: "Successfully",
  //     }),
  //       router.push("/login");
  //   },
  //   onError: (e: any) => {
  //     notification.error({
  //       message: e.message,
  //     });
  //   },
  // });

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
            <Form.Item
              name={["user", "first-name"]}
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["user", "last-name"]} label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name={["user", "company-name"]}
            label="Company Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name={["user", "city"]}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? "").includes(input)}
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
                <Input.Group compact>
                  <Input style={{ width: "23%" }} placeholder="+373" />
                  <Input style={{ width: "50%" }} />
                </Input.Group>
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
