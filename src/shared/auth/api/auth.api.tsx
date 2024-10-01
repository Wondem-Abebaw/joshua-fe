/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../../../store/app.store";
import { setLoading } from "../auth-slice/auth-slice";
import { notification } from "antd";
export let loading = false;

async function getAccessToken(account: any) {
  store.dispatch(setLoading(true));
  await axios
    .post(`${import.meta.env.VITE_APP_API}/auth/login`, account)
    .then((response) => {
      localStorage.setItem("accessToken", response.data?.accessToken);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      return response.data?.access_token;
    })
    .catch(function (error) {
      store.dispatch(setLoading(false));
      if (error.response) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
        });
      } else if (error.request) {
        notification.error({
          message: "Error",
          description: "Check your internet connection",
        });
      } else {
        console.log("Error", error.message);
      }
    });
}

export async function userInfo(account: any) {
  store.dispatch(setLoading(true));
  await getAccessToken(account);

  return axios
    .get(`${import.meta.env.VITE_APP_API}/auth/get-user-info`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.accessToken ? await localStorage.accessToken : ""
        }`,
      },
    })
    .then((response) => {
      store.dispatch(setLoading(false));
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      store.dispatch(setLoading(false));
      if (error.response) {
      } else if (error.request) {
        notification.error({
          message: "Error",
          description: "Check your internet connection",
        });
      } else {
        console.log("Error", error.message);
      }
    });
}

export async function switchRole(roleId: string) {
  return axios
    .get(`${import.meta.env.VITE_APP_API}/auth/switch-role/${roleId}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.accessToken ? await localStorage.accessToken : ""
        }`,
      },
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.data?.accessToken);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      localStorage.setItem(
        "currentRole",
        JSON.stringify(response?.data?.currentRole)
      );
      localStorage.setItem(
        "userRolePermissions",
        JSON.stringify(response?.data?.permissions)
      );
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
        notification.error({
          message: "Error",
          description: "Check your internet connection",
        });
      } else {
        console.log("Error", error.message);
      }
    });
}
