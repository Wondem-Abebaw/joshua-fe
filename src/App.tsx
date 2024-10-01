import "./App.css";
import { ConfigProvider, Spin, notification, theme } from "antd";
import { RootState, store } from "./store/app.store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InternetConnectionStatus from "./shared/component/internet-connection-status/internet-connection-status";
import NotFound from "./shared/component/not-found/not-found-component";

import Dashboard from "./layout/dashboard";
import AuthGuard from "./shared/auth/component/auth";
import { userRoute } from "./feature/user/route/user-route";
import Login from "./shared/auth/component/login/login-component";
import { AuthContextProvider } from "./shared/auth/context/authContext";
import { Suspense } from "react";
import {
  ChangePasswordRoute,
  ForgotPasswordRoute,
} from "./feature/account/route/account.route";
import { RoleRoute } from "./feature/role/route/role-route";

import { activityRoute } from "./feature/activity/route/activity.route";
import { Provider, useSelector } from "react-redux";

import { notificationRoute } from "./feature/notification/route/notification-route";

import { configurationRoute } from "./feature/configuration/route/configuration-route";
import { DashboardRoute } from "./feature/dashboard/route/dashboard.route";
import { feedbackRoute } from "./feature/feedback/route/feedback.route";
import { roomRoute } from "./feature/room/route/room-route";

function App() {
  const [api, contextHolder] = notification.useNotification();
  const themeClass = useSelector(
    (state: RootState) => state.themeReducer.class
  );
  const lightTheme = {
    colorPrimary: "#2faae1",
    colorTextBase: "black",
    colorTextLightSolid: "white",
  };
  const darkTheme = {
    colorPrimary: "#2faae1",
    colorTextBase: "white",
    colorTextLightSolid: "white",
    colorBgBase: "#374151",
    colorBgSpotlight: "gray", // for tooltips
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthContextProvider>
          <Suspense fallback={<Spin spinning={true} />}>
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          </Suspense>
        </AuthContextProvider>
      ),
      children: [
        ...DashboardRoute,
        userRoute,
        roomRoute,
        RoleRoute,
        activityRoute,

        feedbackRoute,

        notificationRoute,

        configurationRoute,
        ChangePasswordRoute,
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "login",
      element: (
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      ),
    },
    ForgotPasswordRoute,
    { path: "*", element: <NotFound /> },
  ]);
  {
    notification.config({
      placement: "bottomRight",
      bottom: 20,
      duration: 3,
      rtl: false,
    });
  }
  return (
    <ConfigProvider
      theme={{
        token: themeClass === "light" ? lightTheme : darkTheme,
      }}
    >
      <Provider store={store}>
        <div className="bg-blue-50 min-h-screen w-full">
          {contextHolder}

          <RouterProvider router={router} />
          <InternetConnectionStatus />
        </div>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
