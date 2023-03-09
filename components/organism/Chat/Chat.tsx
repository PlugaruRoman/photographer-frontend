import { Avatar, Button, Form, Input, Space } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const Chat: React.FC = () => {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState<string[]>([]);

  const onClickSend = (event: any) => {
    if (event.message.trim() === "") return;
    form.resetFields();
    setMessages([...messages, event.message]);
  };

  return (
    <div className="card-chat">
      <ul className="card-chat__display">
        {messages.map((message, index) => (
          <li className="card-chat__message" key={index}>
            <Space size="middle">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="card-chat__message-text">{message}</span>
            </Space>
          </li>
        ))}
      </ul>
      <Form autoComplete="off" form={form} name="basic" onFinish={onClickSend}>
        <Space.Compact block size="large">
          <Form.Item className="card-chat__input" name="message">
            <Input autoFocus placeholder="Type your message here..." />
          </Form.Item>

          <Button size="large" type="default" htmlType="submit">
            Send
          </Button>
        </Space.Compact>
      </Form>
    </div>
  );
};

export default Chat;
