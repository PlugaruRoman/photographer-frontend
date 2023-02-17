import React from "react";
import { Button, Modal } from "antd";
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
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="send" type="primary" onClick={handleOk}>
            Send Message
          </Button>,
          <Button key="link" href="https://google.com" type="primary" onClick={handleOk}>
            Search on Whatsapp
          </Button>,
        ]}
        onCancel={handleCancel}
        title={`${info.firstname}  ${info.lastname}`}
        open={isModalOpen}
        onOk={handleOk}
      >
        <p>{info.city}</p>
        <p>+373{info.phone}</p>
        <p>Let the photographer know you found it on</p>
        <p>Let the photographer know you found it on</p>
        <p>You can also send a private message to the photographer</p>
      </Modal>
    </>
  );
};

export default PhoneModal;
