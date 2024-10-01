/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { appApi } from "../../../store/app.api";
import { ACCOUNT_ENDPOINT } from "../account.endpoints";

interface ChangePassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const accountQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forgetPassword: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${ACCOUNT_ENDPOINT.forget}`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification.success({
            message: "success",
            description:
              "Email with password reset link has been sent to your email address.",
          });
        } catch (error: any) {
          notification.error({
            message: "Error",
            description: error?.error?.data?.message
              ? error?.error?.data?.message
              : "Error try again",
          });
        }
      },
    }),
    changePassword: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${ACCOUNT_ENDPOINT.change_password}`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification.success({
            message: "success",
            description: "Password changed successfully",
          });
        } catch (error: any) {
          notification.error({
            message: "error",
            description: error?.error?.data?.message
              ? error?.error?.data?.message
              : "Error try again",
          });
        }
      },
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${ACCOUNT_ENDPOINT.reset_password}`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification.success({
            message: "success",
            description: "Your password has been successfully reset",
          });
        } catch (error: any) {
          notification.error({
            message: "Error",
            description: error?.error?.data?.message
              ? error?.error?.data?.message
              : "Error try again",
          });
        }
      },
    }),
  }),
  overrideExisting: true,
});
export const {
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = accountQuery;
