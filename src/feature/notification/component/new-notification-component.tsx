import { ClearOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Spin, ConfigProvider } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import {
  useCreateNotificationMutation,
  useLazyGetArchivedNotificationQuery,
  useLazyGetNotificationQuery,
} from "../store/notification.query";
import { Notification } from "../../../models/notification.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusList, jobTypes } from "../../../shared/constants/constant";
import { deviceType } from "../../../shared/constants/enum/deviceType.enum";

interface Props {
  editMode: "new" | "detail";
  notificationData?: Notification;
  handleCancel?: Function;
}

export default function NewNotificationComponent(props: Props) {
  const params = useParams();
  const { editMode, notificationData } = props;
  const schema = yup
    .object<Notification>({
      method: yup.string().required("Please choose method"),
      title: yup.string().required("Notification title is required"),
      body: yup.string().required("Notification body  is required"),
      type: yup.string().required("Please choose receiver"),
      deviceType: yup.string().required("Please choose device type"),
      employmentType: yup
        .string()
        .nullable()
        .when("type", {
          is: (value: string) => value === "employeeuser",
          then: (schema) => schema.required("Please select employee type"),
        }),
      employmentStatus: yup
        .string()
        .nullable()
        .when("type", {
          is: (value: string) => value === "employeeuser",
          then: (schema) => schema.required("Please select employment status"),
        }),
    })
    .required();

  const defaultValue: Notification = {
    title: "",
    body: "",
    type: "all",
    deviceType: "all",
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Notification>({
    defaultValues: defaultValue,
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });

  const selectedjob = watch("type");
  const [getNotification, Notification] = useLazyGetNotificationQuery();
  const [getArchivedNotification, archivedNotificationResponse] =
    useLazyGetArchivedNotificationQuery();
  const [createNotification, createResponse] = useCreateNotificationMutation();

  function onSubmit(data: Notification) {
    createNotification(data).then((response: any) => {
      if (response?.data) {
        if (props && typeof props.handleCancel === "function") {
          props.handleCancel();
        }
      }
    });
  }

  const onError = (error: any) => {
    console.log("Error", error);
  };

  useEffect(() => {
    if (editMode === "detail") {
      if (notificationData?.deletedAt) {
        getArchivedNotification(`${notificationData?.id}`).then(
          (response: any) => {
            if (response?.data) {
              reset(response.data);
            }
          }
        );
      } else {
        getNotification(`${notificationData?.id}`).then((response: any) => {
          if (response?.data) {
            reset(response.data);
          }
        });
      }
    } else {
      reset(defaultValue);
    }
  }, [params.id, params?.type]);
  const sendingMethod = [
    { value: "both", label: "Both" },
    { value: "sms", label: "SMS" },
    { value: "notification", label: "Notification" },
  ];
  const receiverType = [
    { value: "all", label: "All" },
    { value: "employeeuser", label: "Employees" },
    { value: "employer", label: "Employers" },
  ];

  return (
    <Spin spinning={Notification.isLoading || Notification?.isFetching}>
      <div className="w-full flex justify-center">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionActiveBg: "#2FAAE1",
              },
            },
          }}
        >
          <Form
            name="Notification form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit, onError)}
            autoComplete="off"
            className="w-full"
          >
            <div className="flex justify-between space-x-4 pt-3">
              <Controller
                name="method"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Method"
                    required
                    error={errors?.method?.message}
                  >
                    <Select
                      placeholder="Select method"
                      {...field}
                      options={sendingMethod}
                      className="w-full"
                      popupClassName="w-40"
                      status={errors?.method ? "error" : ""}
                    />
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
              <Controller
                name="deviceType"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Device Type"
                    required
                    error={errors?.deviceType?.message}
                  >
                    <Select
                      placeholder="Select device type"
                      {...field}
                      options={[
                        { value: "all", label: "All" },
                        { value: "Android", label: deviceType.android },
                        { value: "IOS", label: deviceType.ios },
                      ]}
                      className="w-full"
                      popupClassName="w-40"
                      status={errors?.deviceType ? "error" : ""}
                    />
                  </InputWrapper>
                )}
              />
            </div>
            <div
              className={`${
                selectedjob === "all" ? "w-[31%]" : "w-full"
              } flex justify-between space-x-4 pt-3`}
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Receiver Type"
                    required
                    error={errors?.type?.message}
                  >
                    <Select
                      className="w-full"
                      popupClassName="w-40"
                      status={errors?.type ? "error" : ""}
                      placeholder="Select receiver type"
                      {...field}
                      options={receiverType}
                    />
                  </InputWrapper>
                )}
              />
              {selectedjob === "employeeuser" && (
                <>
                  {" "}
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Employee Type"
                        required
                        error={errors?.employmentType?.message}
                      >
                        <Select
                          className="w-full"
                          popupClassName="w-40"
                          status={errors?.employmentType ? "error" : ""}
                          placeholder="Select emplyee type"
                          {...field}
                          options={[
                            { value: "all", label: "All" },
                            ...jobTypes,
                          ]}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="employmentStatus"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Status"
                        required
                        error={errors?.employmentStatus?.message}
                      >
                        <Select
                          className="w-full"
                          popupClassName="w-40"
                          status={errors?.employmentStatus ? "error" : ""}
                          placeholder="Select  status"
                          {...field}
                          options={[
                            { value: "all", label: "All" },
                            ...StatusList,
                          ]}
                        />
                      </InputWrapper>
                    )}
                  />
                </>
              )}
              {selectedjob === "employer" && (
                <>
                  <Controller
                    name="isCompany"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Employer Type"
                        required
                        error={errors?.isCompany?.message}
                      >
                        <Select
                          className="w-full"
                          popupClassName="w-40"
                          status={errors?.isCompany ? "error" : ""}
                          placeholder="Select emplyer type"
                          {...field}
                          options={[
                            { value: "all", label: "All" },
                            { value: "false", label: "Individual" },
                            { value: "true", label: "Company" },
                          ]}
                        />
                      </InputWrapper>
                    )}
                  />
                </>
              )}
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
        </ConfigProvider>
      </div>
    </Spin>
  );
}
