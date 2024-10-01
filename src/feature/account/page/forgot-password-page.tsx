import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWrapper from "../../../shared/component/input-wrapper/input-wrapper";
import { useForgetPasswordMutation } from "../store/account.query";
interface ResetPassword {
  email: string;
}
const ForgotPasswordPage = () => {
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .email("Your email should be valid")
        .required("Email is required"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver<ResetPassword>(schema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [forgetPassword, forgetPasswordResponse] = useForgetPasswordMutation();
  function onSubmit(data: ResetPassword) {
    const forgetdata = { email: data.email, type: "employee" };
    forgetPassword(forgetdata).then((response: any) => {
      console.log(response);
      if (!response?.error) {
        navigate("/login");
      }
    });
  }
  return (
    <div className="flex items-center justify-center h-screen bg-primary_very_light">
      <div className="flex shadow-xl rounded-xl overflow-hidden ">
        <div className="bg-secondary p-8 flex flex-col items-center text-primary_very_light">
          <UserOutlined
            style={{ fontSize: "130px" }}
            className="text-primary_very_light"
          />
          <p>Rest Password</p>
        </div>
        <div className="flex justify-evenly items-center px-6  bg-white  text-secondary ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex  flex-col gap-2 w-[300px]"
          >
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
                    placeholder="username@domain.com"
                    className="w-full p-2"
                    status={errors?.email ? "error" : ""}
                    {...field}
                  />
                </InputWrapper>
              )}
            />
            <Button
              className="w-full mt-3 p-5 flex justify-center items-center bg-primary border-primary text-white hover:bg-primary_light hover:border-primary_light transition-all ease-out"
              htmlType="submit"
              loading={forgetPasswordResponse?.isLoading}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
