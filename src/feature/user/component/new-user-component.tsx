import {
  ClearOutlined,
  DeleteOutlined,
  KeyOutlined,
  RollbackOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  Radio,
  Select,
  Spin,
  Tabs,
  Avatar,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import {
  Constants,
  ethiopianCities,
  regions,
} from "../../../shared/constants/constant";
import countryJson from "../../../shared/constants/country-json.json";
import {
  useActivateUserMutation,
  useArchiveUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useLazyGetArchivedUserQuery,
  useLazyGetUserQuery,
  useResetUserPasswordMutation,
  useRestoreUserMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} from "../store/user.query";
import { User } from "../../../models/user.model";
import { yupResolver } from "@hookform/resolvers/yup";
import Confirmation from "../../../shared/component/confirmation/action-confirmation";
import { downloadUrlParser } from "../../../shared/utility/Tools/tools";
import UserRoleComponent from "./user-role-component";
import ActivityLogWrapperComponent from "../../../shared/component/ActivityLog/activityLog-wrapper-component";

interface Props {
  editMode: "new" | "detail";
}

const countryCodes = countryJson.map((country: any) => {
  return { value: country.dial_code, label: country.name };
});
const regionsList = regions.map((region) => {
  return { value: region, label: region };
});

export default function NewUserComponent(props: Props) {
  const { Panel } = Collapse;
  const nameRegEx =
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s'\-]*)$/gi;

  const schema = yup
    .object<User>({
      name: yup
        .string()
        .required("Full Name is required")
        .min(5, "Full Name should have at least 5 characters")
        .max(100, "Full Name should not be more than 100 characters")
        .matches(nameRegEx, "Remove invalid characters"),
      email: yup
        .string()
        .email("Not valid email")
        .test(
          "valid-email",
          "Not valid email",
          (value) => value?.includes("@") && value?.includes(".")
        )
        .required("Email is required"),
      phoneNumber: yup
        .string()
        .test("len", "Phone number must be at least 10 digits", (val) => {
          if (!val) return false;
          let numberWithoutCountryCode = val.substring(4);
          return numberWithoutCountryCode.replace(/[^0-9]/g, "").length === 9; // Checking if the length is exactly 9
        })
        .required("Phone number is required"),
      gender: yup
        .string()
        .oneOf(["male", "female"], "Please select a gender")
        .required("Gender is required"),

      address: yup.object({
        country: yup.string().required("Region is required"),
        city: yup.string().required("City is required"),
        subCity: yup.string().nullable(),
        kebele: yup.string().nullable(),
        woreda: yup.string().required("Woreda/Kebele is required"),
        streetAddress: yup.string().nullable(),
        houseNumber: yup.string().required("House number is required"),
      }),
      emergencyContact: yup.object({
        phoneNumber: yup
          .string()
          .test("len", "Phone number must be at least 10 digits", (val) => {
            if (!val) return false;
            let numberWithoutCountryCode = val.substring(4);
            return numberWithoutCountryCode.replace(/[^0-9]/g, "").length === 9; // Checking if the length is exactly 9
          })
          .required("Emergency contact phone number is required"),
        name: yup
          .string()
          .required("Emergency contact name is required")
          .test(
            "min-length",
            "Full Name should have at least 5 characters",
            (value: any) => {
              if (!value || value.length === 0) return true; // attachment is optional
              return value.trim().length >= 5;
            }
          )
          .max(100, "Full Name should not be more than 100 characters")
          .matches(nameRegEx, "Remove invalid characters"),
      }),
      verified: yup.boolean().default(false),
    })
    .required();

  const defaultValue: User = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: {
      country: "",
      subCity: "",
      woreda: "",
      houseNumber: "",
      specificLocation: "",
    },
    emergencyContact: {
      phoneNumber: "",
      name: "",
    },
  };
  const params = useParams();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: defaultValue,
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState<string>("+251");
  const [emergencyCountryCode, setEmergencyCountryCode] =
    useState<string>("+251");

  const [getUser, myuser] = useLazyGetUserQuery();
  const [getArchivedUser, archiveUserResponse] = useLazyGetArchivedUserQuery();
  const [createUser, createResponse] = useCreateUserMutation();
  const [updateUser, updateResponse] = useUpdateUserMutation();
  const [archiveUser, archiveResponse] = useArchiveUserMutation();
  const [restoreUser, restoreResponse] = useRestoreUserMutation();
  const [deleteUser, deleteResponse] = useDeleteUserMutation();
  const [toogleActivateUser, toogleActivateResponse] =
    useActivateUserMutation();
  const [updateUserProfile, updateProfileResponse] =
    useUpdateUserProfileMutation();
  const [resetUserPassword, resetUserPasswordResponse] =
    useResetUserPasswordMutation();

  const [user, setuser] = useState<any>();

  //----------profile upload------------------------//
  const [previewProfile, setPreviewProfile] = useState<any>(null);
  const [, setUserId] = useState("");

  const { editMode } = props;

  const profileSchema = yup.object().shape({
    profileData: yup
      .mixed()
      .test(
        "fileSize",
        "Profile image file should be less than 2MB",
        (value: any) => {
          if (!value || value.length === 0) return true; // attachment is optional
          changeProfile();
          return value?.file?.size <= 2000000;
        }
      )
      .required("Profile Picture is required"),
  });

  const profileForm = useForm<{ profileData: any }>({
    resolver: yupResolver<any>(profileSchema),
    mode: "all",
  });

  function changeProfile() {
    try {
      const objectUrl = URL.createObjectURL(
        profileForm.getValues("profileData")
      );
      setPreviewProfile(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } catch (e) {
      return null;
    }
  }

  function SubmitProfile() {
    if (profileForm.getValues("profileData")) {
      const formData = new FormData();
      formData.append(
        "profileImage",
        profileForm.getValues("profileData")?.file
      );
      formData.append("id", params?.id ?? "");
      updateUserProfile({ id: params.id ?? "", data: formData })
        .unwrap()
        .then((response: any) => {
          if (response) {
            if (response?.profileImage) {
              let profileImagePath = {
                originalname: response?.profileImage?.originalname,
                path: response?.profileImage?.path,
                filename: response?.profileImage?.filename,
                mimetype: response?.profileImage?.mimetype,
              };
              setPreviewProfile(downloadUrlParser(profileImagePath));
            }
          }
        });
    }
  }

  function onSubmit(data: User) {
    if (editMode === "new") {
      createUser(data).then((response: any) => {
        if (response?.data) {
          reset(defaultValue);
        }
      });
    } else {
      updateUser({
        ...data,
        id: `${params.id}`,
        name: `${data.name} `,
      });
    }
  }

  const onError = (error: any) => {
    console.log("Error", error);
  };

  useEffect(() => {
    if (editMode === "detail") {
      if (params.type === "active") {
        getUser(params?.id?.toString() || "").then((response) => {
          if (response?.data) {
            reset(response.data);
            setuser(response);
            setUserId(response?.data?.id ?? "");
            if (response?.data?.profileImage) {
              const pdata = {
                originalname: response?.data?.profileImage?.originalname,
                path: response?.data?.profileImage?.path,
                filename: response?.data?.profileImage?.filename,
                mimetype: response?.data?.profileImage?.mimetype,
              };

              setPreviewProfile(downloadUrlParser(pdata));
            }
          }
        });
      } else {
        getArchivedUser(params?.id?.toString() || "").then((response) => {
          if (response?.data) {
            reset(response.data);
            setuser(response);
            setUserId(response?.data?.id ?? "");

            if (response?.data?.profileImage) {
              const pdata = {
                originalname: response?.data?.profileImage?.originalname,
                path: response?.data?.profileImage?.path,
                filename: response?.data?.profileImage?.filename,
                mimetype: response?.data?.profileImage?.mimetype,
              };
              setPreviewProfile(downloadUrlParser(pdata));
            }
          }
        });
      }
    } else {
      reset(defaultValue);
    }
  }, [
    params.id,
    editMode,
    getUser,
    updateUser,
    updateUserProfile,
    setPreviewProfile,
  ]);
  const items = [
    {
      key: "1",
      label: `Main`,
      children: (
        <div className="w-full flex justify-center">
          <Form
            name="User form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit, onError)}
            autoComplete="off"
            className="w-full"
          >
            <Collapse defaultActiveKey={["1", "2", "3"]}>
              <Panel
                header="Basic Personal Information"
                key="1"
                className={
                  (errors?.name || errors?.email
                    ? "border border-red-500"
                    : "") + "bg-primary_very_light dark:bg-gray-500"
                }
              >
                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 ">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Full Name"
                        required
                        error={errors?.name?.message}
                      >
                        <Input
                          placeholder="Jhon Doe"
                          className="w-full"
                          status={errors?.name ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Email"
                        required
                        error={errors?.email?.message}
                      >
                        <Input
                          placeholder="name@gmail.com"
                          className="w-full"
                          status={errors?.email ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Phone number"
                        required
                        error={errors?.phoneNumber?.message}
                      >
                        <div className="flex">
                          <Select
                            status={errors?.phoneNumber ? "error" : ""}
                            showSearch
                            popupClassName="w-32"
                            className="rounded-r-none child:rounded-r-none"
                            defaultValue={countryCode}
                            style={{ width: 100 }}
                            onChange={(value) => {
                              setCountryCode(value);
                            }}
                            filterOption={(input, option) =>
                              (option?.label.toLowerCase() ?? "").includes(
                                input.toLowerCase()
                              )
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={countryCodes}
                          />
                          <InputMask
                            placeholder="+251999999999"
                            {...field}
                            mask={`${countryCode}999999999`}
                            autoComplete="off"
                            value={getValues("phoneNumber")}
                            disabled={false}
                            className={`rounded-l-none ant-input border dark:bg-transparent dark:border-black border-gray-300 rounded-r w-full ${
                              errors?.phoneNumber ? "border-danger" : ""
                            }`}
                          />
                        </div>
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        required
                        label="Gender"
                        error={errors?.gender?.message}
                      >
                        <Radio.Group {...field}>
                          <Radio value={"male"}>Male</Radio>
                          <Radio value={"female"}>Female</Radio>
                        </Radio.Group>
                      </InputWrapper>
                    )}
                  />
                </div>
              </Panel>
              <Panel
                header="Address"
                key="2"
                className={
                  (errors?.address ? "border border-red-500" : "") +
                  "bg-primary_very_light dark:bg-gray-500"
                }
              >
                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
                  <Controller
                    name="address.country"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Region"
                        required
                        error={errors?.address?.country?.message}
                      >
                        <Select
                          className="w-full"
                          status={errors?.address?.country ? "error" : ""}
                          defaultValue=""
                          {...field}
                          options={[
                            { label: "Select a region", value: "" },
                            ...regionsList,
                          ]}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="address.city"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="City"
                        required
                        error={errors?.address?.city?.message}
                      >
                        <Select
                          className="w-full"
                          status={errors?.address?.city ? "error" : ""}
                          placeholder="Select city"
                          {...field}
                          options={ethiopianCities}
                          onChange={(value) => {
                            // Ensure that the value is always a string
                            field.onChange(
                              typeof value === "string" ? value : value[0]
                            );
                          }}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
                  <Controller
                    name="address.subCity"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Sub city"
                        error={errors?.address?.subCity?.message}
                      >
                        <Input
                          placeholder="Bole"
                          className="w-full"
                          status={errors?.address?.subCity ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="address.woreda"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Woreda/Kebele"
                        required
                        error={errors?.address?.woreda?.message}
                      >
                        <Input
                          placeholder="Enter woreda/kebele"
                          className="w-full"
                          status={errors?.address?.woreda ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
                  <Controller
                    name="address.specificLocation"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Specific Location"
                        error={errors?.address?.specificLocation?.message}
                      >
                        <Input
                          placeholder="Enter specific location"
                          className="w-full"
                          status={
                            errors?.address?.specificLocation ? "error" : ""
                          }
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="address.houseNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="House Number"
                        required
                        error={errors?.address?.houseNumber?.message}
                      >
                        <Input
                          placeholder="Enter house number"
                          className="w-full"
                          status={errors?.address?.houseNumber ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>
              </Panel>

              <Panel
                header="Emergency Contact Information"
                key="3"
                className={
                  (errors?.emergencyContact ? "border border-red-500" : "") +
                  "bg-primary_very_light dark:bg-gray-500"
                }
              >
                <div className="flex flex-col lg:flex-row lg:space-x-8 sm:space-y-3 lg:space-y-0 mt-4">
                  <Controller
                    name="emergencyContact.name"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Full Name"
                        error={errors?.emergencyContact?.name?.message}
                        required
                      >
                        <Input
                          placeholder="John Doe"
                          className="w-full"
                          status={errors?.emergencyContact?.name ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                  <Controller
                    name="emergencyContact.phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Phone number"
                        error={errors?.emergencyContact?.phoneNumber?.message}
                        required
                      >
                        <div className="flex">
                          <Select
                            status={
                              errors?.emergencyContact?.phoneNumber
                                ? "error"
                                : ""
                            }
                            showSearch
                            popupClassName="w-32"
                            className="rounded-r-none child:rounded-r-none"
                            defaultValue={emergencyCountryCode}
                            style={{ width: 100 }}
                            onChange={(value) => {
                              setEmergencyCountryCode(value);
                            }}
                            filterOption={(input, option) =>
                              (option?.label.toLowerCase() ?? "").includes(
                                input.toLowerCase()
                              )
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={countryCodes}
                          />
                          <InputMask
                            {...field}
                            placeholder="+251999999999"
                            mask={`${emergencyCountryCode}999999999`}
                            autoComplete="off"
                            value={getValues("emergencyContact.phoneNumber")}
                            disabled={false}
                            className={`rounded-l-none ant-input border dark:bg-transparent dark:border-black border-gray-300 rounded-r w-full ${
                              errors?.emergencyContact?.phoneNumber
                                ? "border-danger"
                                : ""
                            }`}
                          />
                        </div>
                      </InputWrapper>
                    )}
                  />
                </div>
              </Panel>
            </Collapse>
            <div className="w-full flex space-x-2  justify-end mt-4">
              {editMode === "detail" && (
                <>
                  {(params?.type === "archived" &&
                    archiveUserResponse?.data?.deletedAt) ||
                  (params?.type === "active" && myuser?.data?.deletedAt) ? (
                    <>
                      {/* //////////////restore/////////////////// */}

                      <Form.Item>
                        <Confirmation
                          header={"Restore Confirmation"}
                          message={"Are you sure you want to restore it?"}
                          type={"notify"}
                          onYes={() => restoreUser(`${params?.id}`)}
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

                      {/* /////////delete permanently/////////// */}

                      <Form.Item>
                        <Confirmation
                          type={"danger"}
                          message={
                            "Are you sure you want to delete it permanently?"
                          }
                          onYes={() =>
                            deleteUser(`${params?.id}`).then((response) => {
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
                          type="danger"
                          header="Archive Confirmation"
                          message={
                            "Are you sure you want to archive this user?"
                          }
                          result={"single"}
                          resultRequired={true}
                          selectorLabel={"Please select a reason"}
                          labelDescription={"Why are you archiving this user?"}
                          options={Constants.UserArchiveReason.map((reason) => {
                            return { label: reason, value: reason };
                          })}
                          customInput={true}
                          yesText="Archive"
                          onYes={(data: string) => {
                            archiveUser({
                              id: `${params.id}`,
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
                            (myuser?.data?.enabled ||
                            archiveUserResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate") + " Confirmation"
                          }
                          message={
                            "Are you sure you want to " +
                            (myuser?.data?.enabled ||
                            archiveUserResponse?.data?.enabled
                              ? "deactivate"
                              : "activate") +
                            " this user?"
                          }
                          type={
                            myuser?.data?.enabled ||
                            archiveUserResponse?.data?.enabled
                              ? "danger"
                              : "notify"
                          }
                          yesText={
                            myuser?.data?.enabled ||
                            archiveUserResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate"
                          }
                          onYes={(): void => {
                            toogleActivateUser(`${params.id?.toString()}`);
                          }}
                        >
                          <Button
                            type="primary"
                            className={
                              myuser?.data?.enabled ||
                              archiveUserResponse?.data?.enabled
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
                            {myuser?.data?.enabled ||
                            archiveUserResponse?.data?.enabled
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                        </Confirmation>
                      </Form.Item>
                      {myuser?.data?.enabled && (
                        <Form.Item>
                          <Confirmation
                            type={"danger"}
                            message={
                              "Are you sure you want to reset this user password?"
                            }
                            onYes={() =>
                              resetUserPassword({
                                phoneNumber: myuser?.data?.phoneNumber,
                                type: "employee",
                              })
                            }
                            header={`Reset Password Confirmation `}
                          >
                            <Button
                              type="primary"
                              className={
                                "bg-danger text-white flex  items-center"
                              }
                              htmlType="button"
                              loading={resetUserPasswordResponse?.isLoading}
                              icon={<KeyOutlined />}
                            >
                              Reset Password
                            </Button>
                          </Confirmation>
                        </Form.Item>
                      )}
                      <Form.Item>
                        <Button
                          // disabled={
                          //   editMode === "detail" && !myuser?.data?.enabled
                          // }
                          type="primary"
                          className="bg-primary shadow-none rounded flex items-center"
                          htmlType="submit"
                          loading={updateResponse?.isLoading}
                          icon={<SaveOutlined />}
                        >
                          {"Update"}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </>
              )}

              {!myuser?.data?.deletedAt &&
                !archiveUserResponse?.data?.deletedAt && (
                  <>
                    {editMode === "new" && (
                      <>
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
                            icon={<SaveOutlined />}
                          >
                            {"Save"}
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </>
                )}
            </div>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: `Profile `,
      children: (
        <div className="flex justify-center h-full">
          <form
            onSubmit={handleSubmit(SubmitProfile, onError)}
            className="w-full gap-y-4 dark:text-white"
          >
            <div className="flex-col space-y-4">
              <div className="flex w-full justify-center mt-2">
                <Avatar src={previewProfile} alt={user?.data?.name} size={85}>
                  {user?.data?.name.charAt(0) ?? "US"}
                </Avatar>
              </div>

              <div className="flex w-full justify-center mt-2">
                <Controller
                  name="profileData"
                  control={profileForm.control}
                  render={({ field }) => (
                    <InputWrapper
                      error={
                        profileForm?.formState?.errors?.profileData?.message
                      }
                    >
                      <Upload
                        {...field}
                        accept="image/png,image/jpeg,image/jpg"
                        beforeUpload={() => false}
                        className=" flex w-full justify-center "
                      >
                        <Button icon={<UploadOutlined />} className=" w-full">
                          Upload File
                        </Button>
                      </Upload>
                    </InputWrapper>
                  )}
                />
              </div>

              <div className="w-full flex justify-end mt-2 items-center">
                <div className="flex">
                  <Button
                    className="flex space-x-1 dark:text-white hover:bg-primary hover:dark:bg_dark_primary hover:text-white "
                    onClick={() => {
                      setPreviewProfile(user?.data?.profileImage?.path);
                      profileForm.reset();
                      // Reset file input text - form reset couldn't reset it!
                      const file: HTMLInputElement | null =
                        document.querySelector(".file");
                      if (file) file.value = "";
                    }}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current h-6"
                        viewBox="0 0 32 32"
                      >
                        <path d="M18.90625 4.09375C18.101563 4.09375 17.265625 4.367188 16.625 4.9375L16.625 4.96875L16.59375 5L4.90625 16.59375C3.695313 17.804688 3.703125 19.777344 4.84375 21.0625L4.875 21.09375L4.90625 21.09375L10.90625 27.09375C11.511719 27.699219 12.320313 27.992188 13.125 28L28 28L28 26L16.5 26L27 15.5C28.265625 14.234375 28.304688 12.210938 27.09375 11L21.09375 5C20.488281 4.394531 19.710938 4.09375 18.90625 4.09375 Z M 18.875 6.125C19.195313 6.125 19.492188 6.210938 19.6875 6.40625L25.6875 12.40625C26.074219 12.792969 26.128906 13.558594 25.59375 14.09375L20.5625 19.125L12.90625 11.46875L17.96875 6.4375L18 6.40625C18.253906 6.195313 18.570313 6.125 18.875 6.125 Z M 11.46875 12.90625L19.125 20.5625L14.03125 25.65625C14.019531 25.664063 14.011719 25.679688 14 25.6875C13.484375 26.117188 12.691406 26.066406 12.3125 25.6875L6.34375 19.75C6.328125 19.730469 6.328125 19.707031 6.3125 19.6875C5.902344 19.171875 5.9375 18.375 6.3125 18Z" />
                      </svg>
                    </span>
                    <span>Reset</span>
                  </Button>

                  <Button
                    className="bg-primary flex space-x-1 text-white"
                    loading={updateProfileResponse.isLoading}
                    onClick={() => {
                      if (profileForm.getValues("profileData")) {
                        SubmitProfile();
                      } else {
                        profileForm.setError("profileData", {
                          message: "Please select an image",
                        });
                      }
                    }}
                  >
                    <span>
                      <SaveOutlined />
                    </span>
                    <span>Submit</span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ),
    },
    {
      key: "3",
      label: `Role `,
      children: <UserRoleComponent />,
    },
  ];
  function filterItemsByMode() {
    if (editMode === "new") return items.filter((item) => item.key == "1");
    else return items;
  }

  return (
    <ActivityLogWrapperComponent
      title={editMode === "detail" ? user?.data?.name : "New User"}
      item={user}
      path={`/user/edit/${params?.type}/${params.id}`}
      id={params.id ?? ""}
    >
      <Spin
        spinning={
          myuser?.isLoading ||
          myuser?.isFetching ||
          archiveUserResponse?.isLoading ||
          archiveUserResponse?.isFetching
        }
      >
        <Tabs defaultActiveKey="1" items={filterItemsByMode()} />
      </Spin>
    </ActivityLogWrapperComponent>
  );
}
