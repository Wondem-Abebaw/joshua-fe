import { RouteObject } from "react-router-dom";
import AuthGuard from "../../../shared/auth/component/auth";
import RolePage from "../page/role-page";

export const RoleRoute: RouteObject = {
  path: "role-management",
  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <RolePage />
    </AuthGuard>
  ),
};
