import { Modal, Tooltip } from "antd";
import SharedNewNotificationComponent from "./new-notification-component";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  value?: Notification;
}
export default function SharedNotificationModalComponenet(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title={<span className="text-xs">Send Notification</span>}>
        <span onClick={showModal}>
          <SendOutlined />
        </span>
      </Tooltip>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[]}
      >
        <SharedNewNotificationComponent
          editMode="new"
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
