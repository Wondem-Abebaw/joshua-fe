import AuthGuard from "../../../shared/auth/component/auth";
import { RouteObject } from "react-router-dom";
import ConfigurationPage from "../page/configuration-page";

export const configurationRoute: RouteObject = {
  path: "/configuration",
  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <ConfigurationPage />
    </AuthGuard>
  ),
};
