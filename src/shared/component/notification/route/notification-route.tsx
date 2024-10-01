import NotificationListPage from "../../../../feature/notification/page/notification-list-page";
import AuthGuard from "../../../auth/component/auth";
import NewNotificationComponent from "../component/new-notification-component";
import { RouteObject } from "react-router-dom";

export const notificationRoute: RouteObject = {
  path: "/notification",
  element: (
    <AuthGuard role={["admin", "super_admin"]}>
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
