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
    <div className="chat">
      <ul className="chat-display">
        {messages.map((message, index) => (
          <li className="message" key={index}>
            <Space size="middle">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="chat-message">{message}</span>
            </Space>
          </li>
        ))}
      </ul>
      <Form
        className="chat-flex"
        autoComplete="off"
        form={form}
        name="basic"
        onFinish={onClickSend}
      >
        <Space.Compact block size="large">
          <Form.Item className="message-input" name="message">
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
