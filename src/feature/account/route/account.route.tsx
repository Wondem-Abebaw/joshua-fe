import { RouteObject } from "react-router-dom";
import ChangePasswordPage from "../component/change-password-page";
import ForgotPasswordPage from "../page/forgot-password-page";

export const ChangePasswordRoute: RouteObject = {
  path: "/accounts/change-password",
  element: <ChangePasswordPage />,
};

export const ForgotPasswordRoute: RouteObject = {
  path: "/accounts/forgot-password",
  element: <ForgotPasswordPage />,
};
