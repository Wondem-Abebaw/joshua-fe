import { SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Skeleton,
  Form,
  Input,
  Card,
  Switch,
  ConfigProvider,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import {
  useLazyGetConfigurationsQuery,
  useUpdateConfigurationMutation,
} from "../store/configuration.query";
import { Configuration } from "../../../models/configuration.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { CollectionQuery } from "../../../models/collection.model";

export default function ConfigurationPage() {
  const [collection, setCollection] = useState<CollectionQuery>({
    skip: 0,
    top: 20,
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  const [getConfigurations, allConfiguration] = useLazyGetConfigurationsQuery();
  const [updateConfiguration, updateResponse] =
    useUpdateConfigurationMutation();

  const schema = yup
    .object<Configuration>({
      globalConfigurations: yup.object({
        recentVersion: yup.string().required("This field is required"),
        timeout: yup
          .number()
          .required("Timeout is required")
          .typeError("Timeout must be a number")
          .min(0, "Number must be greater than or equal to zero"),
        employeeRegistrationFee: yup
          .number()
          .required("Employee registration fee is required")
          .typeError("Employee registration fee must be a number")
          .min(
            0,
            "Employee registration fee must be greater than or equal to zero"
          ),
        employeePlanDuration: yup
          .number()
          .required("Employee plan duration is required")
          .typeError("Employee plan duration must be a number")
          .min(
            0,
            "Employee plan duration must be greater than or equal to zero"
          ),
        employerRegistrationFeeOne: yup
          .number()
          .required("A one-month employer registration fee is required")
          .typeError("A one-month employer registration fee must be a number")
          .min(
            0,
            "A one-month employer registration fee must be greater than or equal to zero"
          ),
        employerRegistrationFeeThree: yup
          .number()
          .required("A three-month employer registration fee is required")
          .typeError("A three-month employer registration fee must be a number")
          .min(
            0,
            "A three-month employer registration fee must be greater than or equal to zero"
          ),
        employerRegistrationFeeSix: yup
          .number()
          .required("A six-month  employer registration fee is required")
          .typeError("A six-month  employer registration fee must be a number")
          .min(
            0,
            "A six-month  employer registration fee must be greater than or equal to zero"
          ),
        employerRegistrationFeeTwelve: yup
          .number()
          .required("A twelve-month employer registration fee is required")
          .typeError(
            "A twelve-month employer registration fee must be a number"
          )
          .min(
            0,
            "A twelve-month employer registration fee must be greater than or equal to zero"
          ),
        freeJobPost: yup
          .number()
          .required("Number of job post for free employer is required")
          .typeError("Number of job post for free employer must be a number")
          .min(
            0,
            "Number of job post for free employer must be greater than or equal to zero"
          ),
        isBeingMaintained: yup.boolean(),
        chapaStatus: yup.boolean(),
      }),
    })
    .required();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Configuration>({
    resolver: yupResolver<any>(schema),
    mode: "onBlur",
  });

  function onSubmit(data: Configuration) {
    updateConfiguration(data);
  }

  const onError = (error: any) => {
    console.log("Error", error);
  };
  useEffect(() => {
    getConfigurations(collection).then((response) => {
      if (response.data) {
        //@ts-ignore
        reset(response?.data);
      }
    });
  }, [collection, getConfigurations]);

  return (
    <Card title="Configuration">
      <Form
        name="Configuration form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit, onError)}
        autoComplete="off"
        className="w-full"
      >
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                handleBg: "#ffff",
              },
            },
          }}
        >
          <div className="flex space-x-8 w-full pb-3">
            {" "}
            <Controller
              name="globalConfigurations.employeePlanDuration"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employee Plan Duration"
                  required
                  error={
                    errors?.globalConfigurations?.employeePlanDuration?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter employee plan duration"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.employeePlanDuration
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
            <Controller
              name="globalConfigurations.employeeRegistrationFee"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employee Reg.Fee"
                  required
                  error={
                    errors?.globalConfigurations?.employeeRegistrationFee
                      ?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter employee registration fee"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.employeeRegistrationFee
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
          </div>
          <div className="flex space-x-8 w-full pb-3">
            <Controller
              name="globalConfigurations.employerRegistrationFeeOne"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employer Reg.Fee (1 Month)"
                  required
                  error={
                    errors?.globalConfigurations?.employerRegistrationFeeOne
                      ?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter one month registration fee"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.employerRegistrationFeeOne
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
            <Controller
              name="globalConfigurations.employerRegistrationFeeThree"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employer Reg.Fee (3 Month)"
                  required
                  error={
                    errors?.globalConfigurations?.employerRegistrationFeeThree
                      ?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter three month registration fee"
                      className="w-full"
                      status={
                        errors?.globalConfigurations
                          ?.employerRegistrationFeeThree
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
          </div>
          <div className="flex space-x-8 w-full pb-3">
            <Controller
              name="globalConfigurations.employerRegistrationFeeSix"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employer Reg.Fee (6 Month)"
                  required
                  error={
                    errors?.globalConfigurations?.employerRegistrationFeeSix
                      ?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter six month registration fee"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.employerRegistrationFeeSix
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
            <Controller
              name="globalConfigurations.employerRegistrationFeeTwelve"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Employer Reg.Fee (12 Month)"
                  required
                  error={
                    errors?.globalConfigurations?.employerRegistrationFeeTwelve
                      ?.message
                  }
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter twelve-month registration fee"
                      className="w-full"
                      status={
                        errors?.globalConfigurations
                          ?.employerRegistrationFeeTwelve
                          ? "error"
                          : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
          </div>
          <div className="flex space-x-8 w-full pt-3">
            <Controller
              name="globalConfigurations.freeJobPost"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="No. of jobs post for free employer"
                  required
                  error={errors?.globalConfigurations?.freeJobPost?.message}
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter No. of jobs post for free employer"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.freeJobPost ? "error" : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
            <Controller
              name="globalConfigurations.timeout"
              control={control}
              render={({ field }) => (
                <InputWrapper
                  label="Timeout (In Seconds)"
                  required
                  error={errors?.globalConfigurations?.timeout?.message}
                  className="w-full"
                >
                  {allConfiguration?.isLoading ||
                  allConfiguration?.isFetching ? (
                    <Skeleton.Input active className="w-full" />
                  ) : (
                    <Input
                      placeholder="Enter timeout"
                      className="w-full"
                      status={
                        errors?.globalConfigurations?.timeout ? "error" : ""
                      }
                      {...field}
                    />
                  )}
                </InputWrapper>
              )}
            />
          </div>
          <div className="flex space-x-8 w-full pt-3">
            <div className="flex space-x-10 w-full">
              {" "}
              <Controller
                name="globalConfigurations.recentVersion"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Recent Version"
                    required
                    error={errors?.globalConfigurations?.recentVersion?.message}
                  >
                    {allConfiguration?.isLoading ||
                    allConfiguration?.isFetching ? (
                      <Skeleton.Input active className="w-full" />
                    ) : (
                      <Input
                        placeholder="1.0.1"
                        className="w-full block"
                        status={
                          errors?.globalConfigurations?.recentVersion
                            ? "error"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  </InputWrapper>
                )}
              />
              <Controller
                name="globalConfigurations.isLive"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Is live?"
                    error={errors?.globalConfigurations?.isLive?.message}
                    className="w-full"
                  >
                    {allConfiguration?.isLoading ||
                    allConfiguration?.isFetching ? (
                      <Skeleton.Input active className="w-full" />
                    ) : (
                      <Switch
                        className={`shadow-md ${
                          field.value === true ? " " : "bg-gray-400"
                        } text-white  `}
                        checked={field.value}
                        onChange={(value) =>
                          setValue("globalConfigurations.isLive", value)
                        }
                      />
                    )}
                  </InputWrapper>
                )}
              />
            </div>
            <div className="flex space-x-2 w-full">
              {" "}
              <Controller
                name="globalConfigurations.isBeingMaintained"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Maintenance Mode"
                    error={
                      errors?.globalConfigurations?.isBeingMaintained?.message
                    }
                    className="w-full"
                  >
                    {allConfiguration?.isLoading ||
                    allConfiguration?.isFetching ? (
                      <Skeleton.Input active className="w-full" />
                    ) : (
                      <Switch
                        className={`shadow-md ${
                          field.value === true ? " " : "bg-gray-400"
                        } text-white  `}
                        checked={field.value}
                        onChange={(value) =>
                          setValue(
                            "globalConfigurations.isBeingMaintained",
                            value
                          )
                        }
                      />
                    )}
                  </InputWrapper>
                )}
              />
              <Controller
                name="globalConfigurations.chapaStatus"
                control={control}
                render={({ field }) => (
                  <InputWrapper
                    label="Chapa Status"
                    error={errors?.globalConfigurations?.chapaStatus?.message}
                    className="w-full"
                  >
                    {allConfiguration?.isLoading ||
                    allConfiguration?.isFetching ? (
                      <Skeleton.Input active className="w-full" />
                    ) : (
                      <Switch
                        className={`shadow-md ${
                          field.value === true ? " " : "bg-gray-400"
                        } text-white  `}
                        checked={field.value}
                        onChange={(value) =>
                          setValue("globalConfigurations.chapaStatus", value)
                        }
                      />
                    )}
                  </InputWrapper>
                )}
              />
            </div>
          </div>
          <div className="w-full flex space-x-2  justify-end pt-10">
            <>
              {allConfiguration?.isLoading || allConfiguration?.isFetching ? (
                <Skeleton.Input active />
              ) : (
                <Button
                  type="primary"
                  className="bg-primary shadow-none rounded flex items-center"
                  htmlType="submit"
                  loading={updateResponse?.isLoading}
                  icon={<SaveOutlined />}
                >
                  Update
                </Button>
              )}
            </>
          </div>
        </ConfigProvider>
      </Form>
    </Card>
  );
}
