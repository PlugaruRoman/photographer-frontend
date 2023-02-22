import React from "react";
import { Button, Modal, Space } from "antd";
import { IPhotographerCard } from "@/types/Photographer";

interface PhoneModalProps {
  info: IPhotographerCard;
  handleOk: () => void;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const PhoneModal: React.FC<PhoneModalProps> = ({ info, handleOk, isModalOpen, handleCancel }) => {
  return (
    <>
      <Modal
        footer={[
          <Button key="back" size="large" type="default" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="send" size="large" type="default" onClick={handleOk}>
            Send Message
          </Button>,
          <Button
            key="link"
            size="large"
            href="https://google.com"
            type="default"
            onClick={handleOk}
          >
            Search on Whatsapp
          </Button>,
        ]}
        onCancel={handleCancel}
        title={`${info.firstname}  ${info.lastname}`}
        open={isModalOpen}
        onOk={handleOk}
      >
        <Space size={"large"} direction="vertical">
          <p style={{ fontSize: "20px" }}>{info.city}</p>
          <p style={{ fontSize: "17px" }}>+373{info.phone}</p>
          <p>Let the photographer know you found it on</p>
          <p>You can also send a private message to the photographer</p>
        </Space>
      </Modal>
    </>
  );
};

export default PhoneModal;
