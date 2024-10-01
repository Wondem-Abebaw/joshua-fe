import { RouteObject } from "react-router-dom";
import FeedbackPage from "../page/feedback-page";
import AuthGuard from "../../../shared/auth/component/auth";
export const feedbackRoute: RouteObject = {
  path: "/feedback",
  element: (
    <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
      <FeedbackPage />
    </AuthGuard>
  ),
};
