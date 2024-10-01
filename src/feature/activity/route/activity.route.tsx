import { RouteObject } from "react-router-dom";
import ActivityPage from "../page/activity-page";
import AuthGuard from "../../../shared/auth/component/auth";
export const activityRoute: RouteObject = {
  path: "/activity",

  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <ActivityPage />
    </AuthGuard>
  ),
};
