import NewUserComponent from "../component/new-user-component";
import UserListPage from "../page/user-list-page";
import AuthGuard from "../../../shared/auth/component/auth";
import { RouteObject } from "react-router-dom";

export const userRoute: RouteObject = {
  path: "/user",
  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <UserListPage />
    </AuthGuard>
  ),
  children: [
    { path: "edit/:type/:id", element: <NewUserComponent editMode="detail" /> },
    { path: ":id", element: <NewUserComponent editMode="new" /> },
  ],
};
