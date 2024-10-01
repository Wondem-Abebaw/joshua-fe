// import { useEffect } from "react";
// import { Card, Col, Row, Statistic } from "antd";
// import {
//   useLazyGetEmployeesQuery,
//   useLazyGetTotalHiredEmployeeCountQuery,
// } from "../../employee/store/employee.query";
// import {
//   ApiOutlined,
//   KeyOutlined,
//   SolutionOutlined,
//   WalletOutlined,
//   WomanOutlined,
// } from "@ant-design/icons";
// import { useLazyGetRequestsQuery } from "../../request/store/request.query";
// import { useLazyGetJobsQuery } from "../../job/store/job.query";
// import { useLazyGetEmployersQuery } from "../../employer/store/employer.query";
// import { useLazyGetCompanyEarningsQuery } from "../store/dashboard.query";

// export function Summary() {
//   const [getAllEmployees, allEmployees] = useLazyGetEmployeesQuery();
//   const [getAllActiveEmployees] = useLazyGetEmployeesQuery();
//   const [getAllInactiveEmployees] = useLazyGetEmployeesQuery();
//   const [getAllEmployers, allEmployers] = useLazyGetEmployersQuery();
//   const [getAllHiredEmployees, allHiredEmployees] =
//     useLazyGetTotalHiredEmployeeCountQuery();
//   const [getAllJobs, allJobs] = useLazyGetJobsQuery();
//   const [getAllRequests, allRequests] = useLazyGetRequestsQuery();
//   const [getAllCompanyEarnings, allCompanyEarnings] =
//     useLazyGetCompanyEarningsQuery();
//   function fetch() {
//     getAllEmployees({
//       count: true,
//     });
//     getAllEmployers({
//       count: true,
//     });
//     getAllHiredEmployees("");
//     getAllJobs({
//       count: true,
//     });
//     getAllRequests({
//       count: true,
//     });
//     getAllActiveEmployees({
//       count: true,
//       filter: [
//         [
//           {
//             field: "enabled",
//             operator: "=",
//             value: true,
//           },
//         ],
//       ],
//     });
//     getAllInactiveEmployees({
//       count: true,
//       filter: [
//         [
//           {
//             field: "enabled",
//             operator: "=",
//             value: false,
//           },
//         ],
//       ],
//     });
//     getAllCompanyEarnings({});
//   }

//   useEffect(() => {
//     fetch();
//   }, []);

//   return (
//     <Row gutter={[8, 8]} justify={"space-between"} className="bg-gray-50">
//       <Col span={24}>
//         <Card
//           bordered={true}
//           title="Summary"
//           headStyle={{ fontSize: "1.5rem" }}
//         >
//           <Row gutter={[16, 16]}>
//             <Card.Grid className="w-1/3 shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allEmployees?.isFetching ||
//                   allEmployees?.isLoading ||
//                   allEmployees?.isUninitialized
//                 }
//                 title="Employees"
//                 value={allEmployees?.data?.count}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<WomanOutlined />}
//               />
//             </Card.Grid>

//             <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allHiredEmployees.isFetching ||
//                   allHiredEmployees.isLoading ||
//                   allHiredEmployees.isUninitialized
//                 }
//                 title="Hired Employees"
//                 value={allHiredEmployees?.data?.distinctCount}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<WomanOutlined />}
//               />
//             </Card.Grid>
//             <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allEmployers?.isFetching ||
//                   allEmployers?.isLoading ||
//                   allEmployers?.isUninitialized
//                 }
//                 title="Employers"
//                 value={allEmployers?.data?.count}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<SolutionOutlined />}
//               />
//             </Card.Grid>
//             <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allJobs?.isFetching ||
//                   allJobs?.isLoading ||
//                   allJobs?.isUninitialized
//                 }
//                 title="Jobs Posted"
//                 value={allJobs?.data?.count}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<KeyOutlined />}
//               />
//             </Card.Grid>
//             <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allRequests?.isFetching ||
//                   allRequests?.isLoading ||
//                   allRequests?.isUninitialized
//                 }
//                 title="Requests"
//                 value={allRequests?.data?.count}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<ApiOutlined />}
//               />
//             </Card.Grid>
//             <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//               <Statistic
//                 loading={
//                   allCompanyEarnings?.isFetching ||
//                   allCompanyEarnings?.isLoading ||
//                   allCompanyEarnings?.isUninitialized
//                 }
//                 title="Incomes"
//                 value={allCompanyEarnings?.data?.total}
//                 valueStyle={{ color: "#3f8600" }}
//                 prefix={<WalletOutlined />}
//                 suffix="ETB"
//               />
//             </Card.Grid>
//           </Row>
//         </Card>
//       </Col>
//     </Row>
//   );
// }
export {};
