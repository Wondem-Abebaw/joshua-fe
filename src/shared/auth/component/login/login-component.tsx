/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Image } from "antd";
import { RootState } from "../../../../store/app.store";
import AuthContext from "../../context/authContext";
import InputWrapper from "../../../component/input-wrapper/input-wrapper";

interface Account {
  phoneNumber: string;
  password: string;
  type?: string;
}
function Login() {
  const { login } = useContext(AuthContext);
  const loading = useSelector((state: RootState) => state.authReducer.loading);
  const schema = yup
    .object({
      phoneNumber: yup.string().required("Phone number is required"),
      password: yup
        .string()
        .min(6, "Password length must be greater than 6")
        .max(25, "Password length must be 25 and less")
        .required("Enter password"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Account>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  function onSubmit(data: Account) {
    login({ ...data, type: `${"employee"}` });
  }

  return (
    <div className=" bg-primary_very_light flex items-center justify-center  h-screen  ">
      <div className="z-10">
        {/* <svg
          id="wave"
          style={{ transform: "rotate(0deg)", transition: "0.3s" }}
          viewBox="0 0 1440 490"
          version="1.1"
          className="absolute left-0 bottom-0 right-0 hidden md:block"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(47, 170, 225, 1)" offset="0%"></stop>
              <stop stop-color="rgba(151, 222, 255, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 0px)", opacity: 1 }}
            fill="url(#sw-gradient-0)"
            d="M0,441L120,367.5C240,294,480,147,720,147C960,147,1200,294,1440,310.3C1680,327,1920,212,2160,179.7C2400,147,2640,196,2880,179.7C3120,163,3360,82,3600,98C3840,114,4080,229,4320,245C4560,261,4800,180,5040,155.2C5280,131,5520,163,5760,179.7C6000,196,6240,196,6480,204.2C6720,212,6960,229,7200,212.3C7440,196,7680,147,7920,171.5C8160,196,8400,294,8640,277.7C8880,261,9120,131,9360,122.5C9600,114,9840,229,10080,228.7C10320,229,10560,114,10800,65.3C11040,16,11280,33,11520,106.2C11760,180,12000,310,12240,367.5C12480,425,12720,408,12960,351.2C13200,294,13440,196,13680,196C13920,196,14160,294,14400,326.7C14640,359,14880,327,15120,334.8C15360,343,15600,392,15840,367.5C16080,343,16320,245,16560,187.8C16800,131,17040,114,17160,106.2L17280,98L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
          />
          <defs>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(47, 170, 225, 1)" offset="0%"></stop>
              <stop stop-color="rgba(151, 222, 255, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
            fill="url(#sw-gradient-1)"
            d="M0,343L120,343C240,343,480,343,720,326.7C960,310,1200,278,1440,236.8C1680,196,1920,147,2160,155.2C2400,163,2640,229,2880,253.2C3120,278,3360,261,3600,220.5C3840,180,4080,114,4320,114.3C4560,114,4800,180,5040,196C5280,212,5520,180,5760,163.3C6000,147,6240,147,6480,163.3C6720,180,6960,212,7200,228.7C7440,245,7680,245,7920,220.5C8160,196,8400,147,8640,122.5C8880,98,9120,98,9360,155.2C9600,212,9840,327,10080,318.5C10320,310,10560,180,10800,114.3C11040,49,11280,49,11520,98C11760,147,12000,245,12240,302.2C12480,359,12720,376,12960,351.2C13200,327,13440,261,13680,212.3C13920,163,14160,131,14400,171.5C14640,212,14880,327,15120,334.8C15360,343,15600,245,15840,212.3C16080,180,16320,212,16560,212.3C16800,212,17040,180,17160,163.3L17280,147L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
          />
          <defs>
            <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
              <stop stop-color="rgba(47, 170, 225, 1)" offset="0%"></stop>
              <stop stop-color="rgba(151, 222, 255, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 100px)", opacity: 0.8 }}
            fill="url(#sw-gradient-2)"
            d="M0,147L120,171.5C240,196,480,245,720,277.7C960,310,1200,327,1440,343C1680,359,1920,376,2160,392C2400,408,2640,425,2880,408.3C3120,392,3360,343,3600,302.2C3840,261,4080,229,4320,179.7C4560,131,4800,65,5040,65.3C5280,65,5520,131,5760,138.8C6000,147,6240,98,6480,122.5C6720,147,6960,245,7200,245C7440,245,7680,147,7920,122.5C8160,98,8400,147,8640,204.2C8880,261,9120,327,9360,334.8C9600,343,9840,294,10080,245C10320,196,10560,147,10800,106.2C11040,65,11280,33,11520,57.2C11760,82,12000,163,12240,196C12480,229,12720,212,12960,179.7C13200,147,13440,98,13680,89.8C13920,82,14160,114,14400,138.8C14640,163,14880,180,15120,187.8C15360,196,15600,196,15840,171.5C16080,147,16320,98,16560,138.8C16800,180,17040,310,17160,375.7L17280,441L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
          />
          <defs>
            <linearGradient id="sw-gradient-3" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(62, 84, 243, 1)" offset="0%" />
              <stop stopColor="rgba(11, 238, 255, 1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 150px)", opacity: 0.7 }}
            fill="url(#sw-gradient-3)"
            d="M0,147L120,179.7C240,212,480,278,720,310.3C960,343,1200,343,1440,294C1680,245,1920,147,2160,106.2C2400,65,2640,82,2880,130.7C3120,180,3360,261,3600,261.3C3840,261,4080,180,4320,138.8C4560,98,4800,98,5040,98C5280,98,5520,98,5760,98C6000,98,6240,98,6480,81.7C6720,65,6960,33,7200,57.2C7440,82,7680,163,7920,179.7C8160,196,8400,147,8640,114.3C8880,82,9120,65,9360,89.8C9600,114,9840,180,10080,228.7C10320,278,10560,310,10800,285.8C11040,261,11280,180,11520,130.7C11760,82,12000,65,12240,89.8C12480,114,12720,180,12960,212.3C13200,245,13440,245,13680,220.5C13920,196,14160,147,14400,179.7C14640,212,14880,327,15120,359.3C15360,392,15600,343,15840,343C16080,343,16320,392,16560,392C16800,392,17040,343,17160,318.5L17280,294L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
          />
        </svg> */}
      </div>

      <div className="z-30 -mt-20 py-6 px-3 bg-white flex space-x-6  items-center md:w-2/5 w-full  shadow-xl rounded-3xl">
        <div className="flex flex-col w-full items-center justify-center space-y-6 pb-4 ">
          <div
            style={{ height: "50px" }}
            className="logo mb-4  mt-7 pr-16 flex justify-center items-center "
          >
            <Image
              preview={false}
              className={"transition duration-300 ease-in-out"}
              src=""
              alt="logo"
            />
          </div>
          <div className="mt-4 pl-4 flex w-full items-center justify-start text-2xl font-medium text-sky-700">
            {/* Welcome to Joshua */}
          </div>
          <div className="flex flex-col  w-full items-center justify-center ">
            <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
              <div className="flex flex-col space-y-5 px-4">
                <div className="flex w-full items-center space-x-4">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Phone Number"
                        required
                        error={errors?.phoneNumber?.message}
                      >
                        <Input
                          placeholder="+251911111111"
                          className="w-full"
                          status={errors?.phoneNumber ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>
                <div className="flex w-full items-center space-x-4">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Password"
                        required
                        error={errors?.password?.message}
                      >
                        <Input.Password
                          placeholder="Password"
                          className="w-full"
                          status={errors?.password ? "error" : ""}
                          {...field}
                        />
                      </InputWrapper>
                    )}
                  />
                </div>
              </div>
              <div className="p-4">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary_light hover:border-primary transition-all ease-out"
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </div>
            </form>
            {/* <div className=" cursor-pointer px-2 text-sm ">
              <NavLink
                to={"/accounts/forgot-password"}
                className={"hover:text-primary"}
              >
                Did you forget your password ?
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
