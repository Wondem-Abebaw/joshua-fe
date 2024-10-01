import NewNotificationComponent from "../component/new-notification-component";
import NotificationListPage from "../page/notification-list-page";
import AuthGuard from "../../../shared/auth/component/auth";
import { RouteObject } from "react-router-dom";

export const notificationRoute: RouteObject = {
  path: "/notification",
  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <NotificationListPage />
    </AuthGuard>
  ),
  children: [
    {
      path: "edit/:type/:id",
      element: <NewNotificationComponent editMode="detail" />,
    },
    { path: ":id", element: <NewNotificationComponent editMode="new" /> },
  ],
};
