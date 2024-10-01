import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Tooltip,
} from "antd";

import { ClearOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import { Notification } from "../../../models/notification.model";
import { useCreateNotificationMutation } from "../../../shared/component/notification/store/notification.query";
interface Props {
  receiverId: string;
}
const sendingMethod = [
  { value: "both", label: "Both" },
  { value: "sms", label: "SMS" },
  { value: "notification", label: "Notification" },
];
const schema = yup
  .object<Notification>({
    method: yup.string().required("Please choose method"),
    title: yup.string().required("Notification title is required"),
    body: yup.string().required("Notification body is required"),
  })
  .required();
const defaultValue: Notification = {
  title: "",
  body: "",
};
export default function FeedbackNotificationModalComponenet(props: Props) {
  const { receiverId } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createNotification, createResponse] = useCreateNotificationMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Notification>({
    defaultValues: defaultValue,
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function onSubmit(data: Notification) {
    createNotification({
      ...data,
      receiver: `${receiverId}`,
    }).then((response: any) => {
      if (response?.data) {
        handleCancel();
      }
    });
  }
  const onError = (error: any) => {
    console.log("Error", error);
  };

  return (
    <>
      <Tooltip title={<span className="text-xs">Send Notification</span>}>
        <Button
          size="small"
          className="text-white text-xs flex  items-center justify-center"
          type="primary"
          onClick={showModal}
        >
          <SendOutlined />
        </Button>
      </Tooltip>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[]}
      >
        <div className="w-full flex justify-center">
          <Form
            name="Notification form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit, onError)}
            autoComplete="off"
            className="w-full"
          >
            <div className="flex justify-between space-x-4">
              <Controller
                name="method"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Method"
                    required
                    error={errors?.method?.message}
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            optionActiveBg: "#2FAAE1",
                          },
                        },
                      }}
                    >
                      <Select
                        className="w-full"
                        popupClassName="w-40"
                        status={errors?.method ? "error" : ""}
                        defaultValue=""
                        {...field}
                        options={[
                          { label: "Select method", value: "" },
                          ...sendingMethod,
                        ]}
                      />
                    </ConfigProvider>
                  </InputWrapper>
                )}
              />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Title"
                    required
                    error={errors?.title?.message}
                  >
                    <Input
                      placeholder="Enter notification title"
                      className="w-full"
                      status={errors?.title ? "error" : ""}
                      {...field}
                    />
                  </InputWrapper>
                )}
              />
            </div>
            <div className="flex-col">
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Body"
                    required
                    error={errors?.body?.message}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 4 }}
                      placeholder="Enter notification body"
                      className="w-full"
                      status={errors?.body ? "error" : ""}
                      {...field}
                    />
                  </InputWrapper>
                )}
              />
            </div>
            <div className="w-full flex space-x-2  justify-end mt-4 -mb-9">
              <Form.Item>
                <Button
                  htmlType="button"
                  icon={<ClearOutlined />}
                  onClick={() => reset(defaultValue)}
                >
                  Reset
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-primary shadow-none rounded flex items-center"
                  htmlType="submit"
                  loading={createResponse?.isLoading}
                  icon={<SendOutlined />}
                >
                  Send
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
