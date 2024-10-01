import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import { useChangePasswordMutation } from "../store/account.query";
interface Changepassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      currentPassword: yup
        .string()
        .min(8, "Password length must be greater than 8")
        .max(25, "Password length must be 25 and less")
        .required("Current Password is required"),
      password: yup
        .string()
        .min(8, "Password length must be greater than 8")
        .max(25, "Password length must be 25 and less")
        .required("New Password is required"),
      confirmPassword: yup
        .string()
        .min(8, "Password length must be greater than 8")
        .max(25, "Password length must be 25 and less")
        .test(
          "",
          "Confirm Password must be the same with the New Password",
          (value) => {
            if (getValues("password") === value) {
              return true;
            } else {
              return false;
            }
          }
        )
        .required("Confirm Password is required"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<Changepassword>({
    resolver: yupResolver<Changepassword>(schema),
    mode: "onBlur",
  });
  const [changePassword, changePasswordResponse] = useChangePasswordMutation();
  function onSubmit(data: Changepassword) {
    changePassword(data).then((response: any) => {
      if (!response?.error) {
        navigate("/");
      }
    });
  }
  return (
    <div className="flex items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full  md:w-1/2 lg:w-1/3 mx-auto shadow-2xl rounded-2xl dark:text-white  py-10 px-6"
      >
        <div className="flex  flex-col gap-4 max-w-xl mx-auto">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <InputWrapper
                label="Current Password"
                required
                error={errors?.currentPassword?.message}
              >
                <Input.Password
                  placeholder="Enter current password"
                  className="w-full p-2"
                  status={errors?.currentPassword ? "error" : ""}
                  {...field}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWrapper
                label="New password"
                required
                error={errors?.password?.message}
              >
                <Input.Password
                  placeholder="Enter new password"
                  className="w-full  p-2"
                  status={errors?.password ? "error" : ""}
                  {...field}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputWrapper
                label="Confirm Password"
                required
                error={errors?.confirmPassword?.message}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  className="w-full p-2"
                  status={errors?.confirmPassword ? "error" : ""}
                  {...field}
                />
              </InputWrapper>
            )}
          />
          <Button
            className="w-full mt-3 p-5 flex justify-center items-center bg-primary border-primary text-white hover:bg-primary_light hover:border-primary_light transition-all ease-out"
            htmlType="submit"
            loading={changePasswordResponse?.isLoading}
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ChangePasswordPage;
