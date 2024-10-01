import {
  ClearOutlined,
  DeleteOutlined,
  RollbackOutlined,
  SaveOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Tabs,
  Upload,
  DatePicker,
  Image,
  Tooltip,
  Avatar,
} from "antd";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import { Constants, roomAmenities } from "../../../shared/constants/constant";
import countryJson from "../../../shared/constants/country-json.json";

import {
  useActivateRoomMutation,
  useArchiveRoomMutation,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useLazyGetArchivedRoomQuery,
  useLazyGetRoomQuery,
  useRestoreRoomMutation,
  useUpdateRoomMutation,
} from "../store/room.query";

import { yupResolver } from "@hookform/resolvers/yup";
import Confirmation from "../../../shared/component/confirmation/action-confirmation";
import { downloadUrlParser } from "../../../shared/utility/Tools/tools";

import ActivityLogWrapperComponent from "../../../shared/component/ActivityLog/activityLog-wrapper-component";
import { CollectionQuery } from "../../../models/collection.model";
import { debounce } from "lodash-es";

import moment from "moment";
import dayjs from "dayjs";
import { Room } from "../../../models/room.model";
interface Props {
  editMode: "new" | "detail";
}

export default function NewRoomComponent(props: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const [planCollection, setPlanCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 10,
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  const [roomImageUrl, setRoomImageUrl] = useState<any>(null);

  const [countryCode, setCountryCode] = useState<string>("+251");

  const [getRoom, myRoom] = useLazyGetRoomQuery();
  const [getArchivedRoom, archiveRoomResponse] = useLazyGetArchivedRoomQuery();
  const [createRoom, createResponse] = useCreateRoomMutation();
  const [updateRoom, updateResponse] = useUpdateRoomMutation();
  const [archiveRoom, archiveResponse] = useArchiveRoomMutation();
  const [restoreRoom, restoreResponse] = useRestoreRoomMutation();
  const [deleteRoom, deleteResponse] = useDeleteRoomMutation();
  const [toogleActivateRoom, toogleActivateResponse] =
    useActivateRoomMutation();

  // set Room will set either archived or non archived Room
  const [currentRoom, setRoom] = useState<any>();

  const [, setRoomId] = useState("");
  const countryCodes = countryJson.map((country: any) => {
    return { value: country.dial_code, label: country.name };
  });

  const { editMode } = props;

  const createSchema = (editMode: string) => {
    const baseSchema = yup.object<Room>({
      name: yup
        .string()
        .trim()
        .required("Name is required")
        .min(2, "Name should have at least 2 characters")
        .max(50, "Name should not be more than 50 characters"),
      description: yup
        .string()
        .min(10, "Name should have at least 10 characters")
        .max(150, "Name should not be more than 150 characters")
        .nullable(),

      verified: yup.boolean().default(false),
    });

    if (editMode === "new") {
      return baseSchema.shape({
        roomImage: yup
          .mixed()
          .test(
            "fileSize",
            "RoomImage file should be less than 2MB",
            (value: any) => {
              if (!value || !value[0]) return true;
              return value[0].size <= 2000000;
            }
          )
          .required("RoomImage image is required"),
      });
    } else {
      // Make the specified fields optional
      return baseSchema.shape({
        roomImage: yup
          .mixed()

          .test(
            "fileSize",
            "RoomImage file should be less than 2MB",
            (value: any) => {
              if (!value || !value[0]) return true;
              return value[0].size <= 2000000;
            }
          )

          .nullable(),
      });
    }
  };
  const schema = createSchema(editMode);

  const defaultValue: Room = {
    id: "",
    name: "",
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<Room>({
    defaultValues: defaultValue,
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });

  async function onSubmit(data: Room) {
    const isValid = await trigger(); // Triggers validation for all fields
    if (!isValid) return;
    const formData = new FormData();
    data?.roomImage &&
      formData.append("roomImage", data?.roomImage[0]?.originFileObj);

    data?.name && formData.append("name", data.name);
    data?.description && formData.append("description", data.description);
    data?.price && formData.append("price", data.price);

    data?.amenities &&
      data?.amenities?.forEach((item, index) => {
        formData.append(`amenities[${index}]`, item);
      });
    if (editMode === "new") {
      // @ts-ignore
      createRoom(formData).then((response: any) => {
        if (response?.data) {
          reset(defaultValue);
        }
      });
    } else {
      formData.append("id", `${params.id}`),
        // @ts-ignore
        updateRoom(formData).then((response: any) => {
          if (response?.data) {
            reset({ ...response.data, roomImage: null });
            if (response?.data?.roomImage) {
              const pdata = {
                originalname: response?.data?.roomImage?.originalname,
                path: response?.data?.roomImage?.path,
                filename: response?.data?.roomImage?.filename,
                mimetype: response?.data?.roomImage?.mimetype,
              };

              setRoomImageUrl(downloadUrlParser(pdata));
            }
          }
        });
    }
  }

  const onError = (error: any) => {
    console.log("Error", error);
  };

  useEffect(() => {
    if (editMode === "detail") {
      if (params.type === "active") {
        getRoom(`${params?.id}`).then((response) => {
          if (response?.data) {
            reset({ ...response.data, roomImage: null });
            setRoom(response);
            setRoomId(response?.data?.id ?? "");
            if (response?.data?.roomImage) {
              const pdata = {
                originalname: response?.data?.roomImage?.originalname,
                path: response?.data?.roomImage?.path,
                filename: response?.data?.roomImage?.filename,
                mimetype: response?.data?.roomImage?.mimetype,
              };

              setRoomImageUrl(downloadUrlParser(pdata));
            }
          }
        });
      } else {
        getArchivedRoom(`${params?.id}`).then((response) => {
          if (response?.data) {
            reset({ ...response.data, roomImage: null });
            setRoom(response);
            setRoomId(response?.data?.id ?? "");

            if (response?.data?.roomImage) {
              const pdata = {
                originalname: response?.data?.roomImage?.originalname,
                path: response?.data?.roomImage?.path,
                filename: response?.data?.roomImage?.filename,
                mimetype: response?.data?.roomImage?.mimetype,
              };
              setRoomImageUrl(downloadUrlParser(pdata));
            }
          }
        });
      }
    } else {
      reset(defaultValue);
    }
  }, [params.id, editMode, getRoom, updateRoom]);
  const items = [
    {
      key: "1",
      label: `Main`,

      children: (
        <div className="w-full flex justify-center">
          <Form
            name="Room form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit, onError)}
            autoComplete="off"
            className="w-full"
          >
            <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Name"
                    error={errors?.name?.message}
                    required
                  >
                    <Input
                      placeholder="Enter name"
                      className="w-full"
                      status={errors?.name ? "error" : ""}
                      {...field}
                    />
                  </InputWrapper>
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Price"
                    error={errors?.name?.message}
                    required
                  >
                    <Input
                      placeholder="Enter price"
                      className="w-full"
                      status={errors?.price ? "error" : ""}
                      {...field}
                    />
                  </InputWrapper>
                )}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
              <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Amenities"
                    required
                    error={errors?.amenities?.message}
                  >
                    <Select
                      className="w-full"
                      status={errors?.amenities ? "error" : ""}
                      placeholder="Select amenities"
                      {...field}
                      mode="multiple"
                      options={roomAmenities.map((amenity) => ({
                        value: amenity,
                        label: amenity,
                      }))}
                    />
                  </InputWrapper>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label=" Description"
                    error={errors?.description?.message}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 3, maxRows: 4 }}
                      placeholder="Enter  description"
                      className="w-full"
                      status={errors?.description ? "error" : ""}
                      {...field}
                    />
                  </InputWrapper>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
              <Controller
                control={control}
                name="roomImage"
                render={({ field }) => (
                  <InputWrapper
                    label={"Room Image (max-size=2MB)"}
                    required
                    error={errors?.roomImage?.message}
                  >
                    <div className="flex-col space-y-3">
                      <div className="text-primary_light">
                        {roomImageUrl !== null ? (
                          <Image width={200} src={roomImageUrl} />
                        ) : (
                          <Avatar
                            shape="square"
                            size={60}
                            icon={<UserOutlined />}
                            alt="Employer Image"
                          />
                        )}
                      </div>
                      <div className="">
                        <Upload
                          {...field}
                          accept="image/png,image/jpeg,image/jpg"
                          beforeUpload={() => false}
                          multiple={false}
                          maxCount={1}
                          fileList={
                            Array.isArray(field.value) ? field.value : []
                          }
                          onChange={(info) => {
                            const fileList =
                              info.fileList.length > 0 ? info.fileList : null;
                            field.onChange(fileList);
                            trigger("roomImage");
                            if (info.fileList !== null) {
                              setRoomImageUrl(
                                URL.createObjectURL(
                                  info?.fileList[0].originFileObj as File
                                )
                              );
                            }
                          }}
                        >
                          <Tooltip
                            title={
                              <span className="text-xs">
                                Acceptable file types are png,jpeg and jpg
                              </span>
                            }
                          >
                            <Button icon={<UploadOutlined />}>
                              Upload File
                            </Button>
                          </Tooltip>
                        </Upload>
                      </div>
                    </div>
                  </InputWrapper>
                )}
              />
            </div>

            <div className="w-full flex space-x-2  justify-end mt-4">
              {editMode === "detail" && (
                <>
                  {(params?.type === "archived" &&
                    archiveRoomResponse?.data?.deletedAt) ||
                  (params?.type === "active" && myRoom?.data?.deletedAt) ? (
                    <>
                      {/* //////////////restore/////////////////// */}

                      <Form.Item>
                        <Confirmation
                          header={"Restore Confirmation"}
                          message={"Are you sure you want to restore it?"}
                          type={"notify"}
                          onYes={() => restoreRoom(`${params?.id}`)}
                        >
                          <Button
                            type="primary"
                            className={"bg-green-500"}
                            htmlType="button"
                            loading={restoreResponse?.isLoading}
                            icon={<RollbackOutlined />}
                          >
                            Restore
                          </Button>
                        </Confirmation>
                      </Form.Item>

                      {/* /////////delete permantlt/////////// */}

                      <Form.Item>
                        <Confirmation
                          type={"danger"}
                          message={
                            "Are you sure you want to delete it permanently?"
                          }
                          onYes={() =>
                            deleteRoom(`${params?.id}`).then((response) => {
                              if (response) {
                                navigate(-1);
                              }
                            })
                          }
                          header={`Permanent Delete Confirmation `}
                        >
                          <Button
                            type="primary"
                            className={
                              "bg-danger text-white flex  items-center"
                            }
                            htmlType="button"
                            loading={deleteResponse?.isLoading}
                            icon={<DeleteOutlined />}
                          >
                            Delete
                          </Button>
                        </Confirmation>
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      {/* -/////////////archive uesr///////////// */}

                      <Form.Item>
                        <Confirmation
                          header="Archive Confirmation"
                          message={"Are you sure you want to archive it?"}
                          type="danger"
                          result={"single"}
                          resultRequired={true}
                          selectorLabel={"Please select a reason"}
                          labelDescription={"Why are you archiving it?"}
                          options={Constants.ArchiveReason.map((reason) => {
                            return { label: reason, value: reason };
                          })}
                          customInput={true}
                          yesText="Archive"
                          onYes={(data: string) => {
                            archiveRoom({
                              id: `${params.id?.toString()}`,
                              reason: data,
                            });
                          }}
                        >
                          <Button
                            type="primary"
                            className="text-white bg-danger shadow-none"
                            htmlType="button"
                            loading={archiveResponse?.isLoading}
                            icon={<DeleteOutlined />}
                          >
                            Archive
                          </Button>
                        </Confirmation>
                      </Form.Item>
                      {/* -/////////////activate uesr///////////// */}
                      <Form.Item>
                        <Confirmation
                          header={
                            (myRoom?.data?.enabled ||
                            archiveRoomResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate") + " Confirmation"
                          }
                          type={
                            myRoom?.data?.enabled ||
                            archiveRoomResponse?.data?.enabled
                              ? "danger"
                              : "notify"
                          }
                          message={
                            "Are you sure you want to " +
                            (myRoom?.data?.enabled ||
                            archiveRoomResponse?.data?.enabled
                              ? "deactivate"
                              : "activate") +
                            " it?"
                          }
                          yesText={
                            myRoom?.data?.enabled ||
                            archiveRoomResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate"
                          }
                          onYes={(): void => {
                            toogleActivateRoom(`${params.id?.toString()}`);
                          }}
                        >
                          <Button
                            type="primary"
                            className={
                              myRoom?.data?.enabled ||
                              archiveRoomResponse?.data?.enabled
                                ? "bg-danger"
                                : "bg-green-500"
                            }
                            htmlType="button"
                            loading={toogleActivateResponse?.isLoading}
                          >
                            <span className="w- h-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current h-6"
                                viewBox="0 0 48 48"
                              >
                                <path d="M23.5 5C17.16639 5 12 10.16639 12 16.5C12 18.130861 12.341389 19.689962 12.957031 21.099609 A 1.50015 1.50015 0 1 0 15.707031 19.900391C15.252673 18.860038 15 17.713139 15 16.5C15 11.78761 18.78761 8 23.5 8C28.21239 8 32 11.78761 32 16.5C32 17.08427 31.94138 17.652314 31.830078 18.201172 A 1.50015 1.50015 0 1 0 34.769531 18.798828C34.92023 18.055686 35 17.28573 35 16.5C35 10.16639 29.83361 5 23.5 5 z M 23.5 12C21.032499 12 19 14.032499 19 16.5L19 25.759766L18.138672 25.404297C14.483804 23.900444 10.334734 26.436466 10.005859 30.375 A 1.50015 1.50015 0 0 0 10.693359 31.765625L19.957031 37.667969C20.601036 38.078718 21.151526 38.620029 21.576172 39.255859L23.033203 41.441406 A 1.50015 1.50015 0 0 0 23.035156 41.441406C23.803886 42.591886 25.189849 43.186167 26.554688 42.945312L31.882812 42.005859C33.603893 41.703285 34.998876 40.422039 35.449219 38.734375 A 1.50015 1.50015 0 0 0 35.451172 38.726562L37.832031 29.576172C38.653863 26.49462 36.64066 23.318721 33.501953 22.748047L28 21.748047L28 16.5C28 14.032499 25.967501 12 23.5 12 z M 23.5 15C24.346499 15 25 15.653501 25 16.5L25 23 A 1.50015 1.50015 0 0 0 26.232422 24.476562L32.964844 25.699219C34.424137 25.964545 35.315668 27.370273 34.933594 28.802734 A 1.50015 1.50015 0 0 0 34.929688 28.8125L32.550781 37.960938C32.399124 38.529274 31.940201 38.949356 31.363281 39.050781 A 1.50015 1.50015 0 0 0 31.363281 39.052734L26.033203 39.992188C25.834042 40.027338 25.642567 39.944908 25.529297 39.775391L24.072266 37.591797C23.417016 36.610136 22.565912 35.77367 21.570312 35.138672 A 1.50015 1.50015 0 0 0 21.568359 35.138672L13.251953 29.835938C13.814585 28.352335 15.413607 27.528548 16.996094 28.179688L19.929688 29.386719 A 1.50015 1.50015 0 0 0 22 28L22 16.5C22 15.653501 22.653501 15 23.5 15 z" />
                              </svg>
                            </span>
                            {myRoom?.data?.enabled ||
                            archiveRoomResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                        </Confirmation>
                      </Form.Item>
                    </>
                  )}
                </>
              )}

              {!myRoom?.data?.deletedAt &&
                !archiveRoomResponse?.data?.deletedAt && (
                  <>
                    {editMode === "new" && (
                      <Form.Item>
                        <Button
                          // disabled={
                          //   editMode === "detail" && !myRoom?.data?.enabled
                          // }

                          htmlType="button"
                          icon={<ClearOutlined />}
                          onClick={() => {
                            reset(defaultValue), setRoomImageUrl("");
                          }}
                        >
                          Reset
                        </Button>
                      </Form.Item>
                    )}

                    <Form.Item>
                      <Button
                        // disabled={
                        //   editMode === "detail" && !myRoom?.data?.enabled
                        // }
                        type="primary"
                        className="bg-primary shadow-none rounded flex items-center"
                        htmlType="submit"
                        loading={
                          editMode === "new"
                            ? createResponse?.isLoading
                            : updateResponse?.isLoading
                        }
                        icon={<SaveOutlined />}
                      >
                        {editMode === "new" ? "Save" : "Update"}
                      </Button>
                    </Form.Item>
                  </>
                )}
            </div>
          </Form>
        </div>
      ),
    },
  ];
  function filterItemsByMode() {
    if (editMode === "new") return items.filter((item) => item.key == "1");
    else return items;
  }
  return (
    <ActivityLogWrapperComponent
      title={
        editMode === "detail" ? (
          <div>{currentRoom?.data?.name}</div>
        ) : (
          "New Room"
        )
      }
      item={currentRoom}
      path={`/rooms/edit/${params?.type}/${params.id}`}
      id={params.id ?? ""}
    >
      <Spin
        spinning={
          myRoom?.isLoading ||
          myRoom?.isFetching ||
          archiveRoomResponse?.isLoading ||
          archiveRoomResponse?.isFetching
        }
      >
        <Tabs defaultActiveKey="1" items={filterItemsByMode()} />
      </Spin>
    </ActivityLogWrapperComponent>
  );
}
