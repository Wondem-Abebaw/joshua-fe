import AuthGuard from "../../../shared/auth/component/auth";
import { RouteObject } from "react-router-dom";
import RoomListPage from "../page/room-list-page";
import NewRoomComponent from "../component/new-room-component";

export const roomRoute: RouteObject = {
  path: "/room",
  element: (
    <AuthGuard role={["admin", "super_admin"]}>
      <RoomListPage />
    </AuthGuard>
  ),
  children: [
    {
      path: "edit/:type/:id",
      element: <NewRoomComponent editMode="detail" />,
    },
    { path: ":id", element: <NewRoomComponent editMode="new" /> },
  ],
};
