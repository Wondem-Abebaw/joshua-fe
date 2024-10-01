import { ClearOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Spin, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import {
  useCreateNotificationMutation,
  useLazyGetArchivedNotificationQuery,
  useLazyGetNotificationQuery,
} from "../store/notification.query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Notification } from "../../../../models/notification.model";
import InputWrapper from "../../input-wrapper/input-wrapper";
import {
  notificationBodies,
  notificationTitles,
} from "../../../constants/constant";
interface Props {
  editMode: "new" | "detail";
  notificationData?: Notification;
  handleCancel?: Function;
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
  title: undefined,
  body: undefined,
};
export default function SharedNewNotificationComponent(props: Props) {
  const params = useParams();
  const { editMode, notificationData } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Notification>({
    defaultValues: defaultValue,
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });
  const [currentNotification, setCurrentNotification] = useState<any>();
  const [getNotification, Notification] = useLazyGetNotificationQuery();
  const [getArchivedNotification, archivedNotificationResponse] =
    useLazyGetArchivedNotificationQuery();
  const [createNotification, createResponse] = useCreateNotificationMutation();
  function onSubmit(data: Notification) {
    {
      params?.id
        ? createNotification({ ...data, receiver: `${params?.id}` }).then(
            (response: any) => {
              if (response?.data) {
                if (props && typeof props.handleCancel === "function")
                  props?.handleCancel();
              }
            }
          )
        : createNotification({
            ...data,
            receiver: `${notificationData?.receiver}`,
          }).then((response: any) => {
            if (response?.data) {
              if (props && typeof props.handleCancel === "function")
                props?.handleCancel();
            }
          });
    }
  }
  const onError = (error: any) => {
    console.log("Error", error);
  };
  useEffect(() => {
    if (editMode === "detail") {
      if (notificationData?.deletedAt) {
        getArchivedNotification(`${notificationData?.id}`).then((response) => {
          if (response?.data) {
            setCurrentNotification(response?.data);
            reset({
              ...response?.data,
              receiver: `${response?.data?.receiver}`,
            });
          }
        });
      } else {
        getNotification(`${notificationData?.id}`).then((response) => {
          if (response?.data) {
            setCurrentNotification(response?.data);
            reset({
              ...response?.data,
              receiver: `${response?.data?.receiver}`,
            });
          }
        });
      }
    } else {
      reset(defaultValue);
    }
  }, [params.id, params?.type, notificationData]);
  const selectedTitle = watch(["title"])[0];

  useEffect(() => {
    // Function to find the key of the selected title
    const findTitleKey = (selectedTitle: any) => {
      const title = notificationTitles.find(
        (title) => title.value === selectedTitle
      );
      return title ? title.key : null;
    };

    // Get the key of the selected title
    const titleKey = findTitleKey(selectedTitle);

    // Find the corresponding body for the selected title
    const correspondingBody = notificationBodies.find(
      (body) => body.key === titleKey
    );

    // Set the value of the body field
    setValue(
      "body",
      correspondingBody
        ? correspondingBody.value
        : currentNotification
        ? currentNotification?.body
        : ""
    );
  }, [selectedTitle, setValue]);
  return (
    <Spin spinning={Notification.isLoading || Notification?.isFetching}>
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
                      {...field}
                      placeholder="Select method"
                      options={sendingMethod}
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
                  <Select
                    mode="tags"
                    maxTagCount={1}
                    className="w-full"
                    popupClassName="w-80"
                    status={errors?.title ? "error" : ""}
                    {...field}
                    placeholder="Select or enter title"
                    options={notificationTitles}
                    onChange={(value) => {
                      field.onChange(
                        typeof value === "undefined"
                          ? undefined
                          : typeof value === "string"
                          ? value
                          : value[0]
                      );
                    }}
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
                    autoSize={{ maxRows: 5 }}
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
                className=" shadow-none rounded flex items-center"
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
    </Spin>
  );
}
