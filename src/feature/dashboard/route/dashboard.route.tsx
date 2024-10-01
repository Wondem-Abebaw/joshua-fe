import AuthGuard from "../../../shared/auth/component/auth";
import DashBoardComponent from "../page/dashboard-page";
// import EmployeeDashboardPage from "../page/employee-dashboard-page";
// import JobDashboardPage from "../page/job-dashboard-page ";
// import RequestDashboardPage from "../page/request-dashboard-page ";
// import EmployerDashboardPage from "../page/employer-dashboard-page ";
// import IncomeDashboardPage from "../page/Income-dashboard-page";

export const DashboardRoute = [
  {
    path: "/",
    element: (
      <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
        <DashBoardComponent />
      </AuthGuard>
    ),
  },
  // {
  //   path: "/dashboard/employee",
  //   element: (
  //     <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
  //       <EmployeeDashboardPage />
  //     </AuthGuard>
  //   ),
  // },
  // {
  //   path: "/dashboard/job",
  //   element: (
  //     <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
  //       <JobDashboardPage />
  //     </AuthGuard>
  //   ),
  // },
  // {
  //   path: "/dashboard/request",
  //   element: (
  //     <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
  //       <RequestDashboardPage />
  //     </AuthGuard>
  //   ),
  // },
  // {
  //   path: "/dashboard/employer",
  //   element: (
  //     <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
  //       <EmployerDashboardPage />
  //     </AuthGuard>
  //   ),
  // },
  // {
  //   path: "/dashboard/income",
  //   element: (
  //     <AuthGuard role={["admin", "super_admin", "finance", "operator"]}>
  //       <IncomeDashboardPage />
  //     </AuthGuard>
  //   ),
  // },
];
