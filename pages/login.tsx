import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Button, Form, Input, notification } from "antd";

import { AuthService } from "@/api/auth/auth";
import { useAuth } from "@/contextes/AuthContext/useAuth";

const Login: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const onFinish = (values: any) => {
    mutate({
      identifier: values.username,
      password: values.password,
    });
    setUser(values.username);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { mutate } = useMutation(AuthService.loginUser, {
    onSuccess: (res) => {
      notification.success({
        message: "Successfully",
      });
      localStorage.setItem("user", res.config.data);
      localStorage.setItem("Token", res.data.jwt);
      router.push("/");
    },
    onError: (e) => {
      notification.error({
        message: "Error!",
        description: `The username or password is incorrect`,
      });
    },
  });

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1 style={{ margin: "0 auto", fontSize: "30px" }}>Login Page</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: "40px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          ></Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
