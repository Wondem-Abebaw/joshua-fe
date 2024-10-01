import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Permission } from "../../models/permission.model";

const refreshToken = async () => {
  const config: AxiosRequestConfig = {
    url: `${import.meta.env.VITE_APP_API}/auth/refresh`,
    method: "post",
    headers: {
      "x-refresh-token": (await localStorage.refreshToken)
        ? localStorage.refreshToken
        : "",
    },
  };
  try {
    const { data } = await axios(config);
    localStorage.setItem("accessToken", data?.accessToken);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      window.location.href = `${window.location.origin}/login`;
    }
  }
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      headers?: AxiosRequestConfig["headers"];
      params?: AxiosRequestConfig["params"];
      responseType?: AxiosRequestConfig["responseType"];
      permission?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, permission, headers, responseType }) => {
    try {
      let grant = false;
      const permissions = await localStorage.userRolePermissions;
      const currentRole = await localStorage.currentRole;
      if (
        currentRole &&
        !(
          url.includes("get-user-roles") ||
          url.includes("get-user-permissions-by-role-id")
        ) &&
        JSON.parse(currentRole)?.key !== "super_admin"
      ) {
        if (permission && permissions && JSON.parse(permissions)?.length > 0) {
          JSON.parse(permissions)?.forEach((element: Permission) => {
            if (element.key === `${permission}`) {
              grant = true;
            }
          });

          if (!grant) {
            return {
              error: {
                status: 403,
                data: { message: `You don't have ${permission} permission ` },
              },
            };
          }
        }
      }

      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method: method,
        data: data,
        params: params,
        responseType: responseType,
        headers: {
          ...headers,
          Authorization: `Bearer ${
            localStorage.accessToken ? await localStorage.accessToken : ""
          }`,
        },
      };

      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if (err.response?.status === 401) {
        // try to get a new token
        await refreshToken();
        const result = await axios({
          ...err.config,
          headers: {
            Authorization: `Bearer ${await localStorage.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        return { data: result.data };
      }
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
