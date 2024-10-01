// import { Card, Col, Row, Statistic } from "antd";
// import dayjs from "dayjs";
// import { useEffect } from "react";
// import {
//   useLazyGetEmployeesQuery,
//   useLazyGetTodaysHiredEmployeeCountQuery,
// } from "../../employee/store/employee.query";
// import { useLazyGetEmployersQuery } from "../../employer/store/employer.query";
// import {
//   ApiOutlined,
//   KeyOutlined,
//   SolutionOutlined,
//   WalletOutlined,
//   WomanOutlined,
// } from "@ant-design/icons";
// import { useLazyGetJobsQuery } from "../../job/store/job.query";
// import { useLazyGetRequestsQuery } from "../../request/store/request.query";
// import {
//   useLazyGetCompanyEarningsQuery,
//   useLazyGetDateQuery,
// } from "../store/dashboard.query";

// export function TodayReport() {
//   const [getTodaysEmployees, todaysEmployees] = useLazyGetEmployeesQuery();
//   const [getTodaysEmployers, todaysEmployers] = useLazyGetEmployersQuery();
//   const [getTodaysHiredEmployees, todaysHiredEmployees] =
//     useLazyGetTodaysHiredEmployeeCountQuery();
//   const [getTodaysJobs, todaysJobs] = useLazyGetJobsQuery();
//   const [getTodaysRequests, todaysRequests] = useLazyGetRequestsQuery();
//   const [getTodaysCompanyErnings, todaysCompanyErnings] =
//     useLazyGetCompanyEarningsQuery();
//   const [getDate, dateResponse] = useLazyGetDateQuery();
//   useEffect(() => {
//     const fetchTime = async () => {
//       try {
//         const response = await getDate();
//         const currentTime = response.data.split("T")[0];
//         getTodaysEmployees({
//           filter: [
//             [
//               {
//                 field: "createdAt",
//                 operator: ">",
//                 value: currentTime,
//               },
//             ],
//           ],
//           count: true,
//         });
//         getTodaysEmployers({
//           filter: [
//             [
//               {
//                 field: "createdAt",
//                 operator: ">",
//                 value: currentTime,
//               },
//             ],
//           ],
//           count: true,
//         });
//         getTodaysHiredEmployees();
//         getTodaysJobs({
//           filter: [
//             [
//               {
//                 field: "createdAt",
//                 operator: ">",
//                 value: currentTime,
//               },
//             ],
//           ],
//         });
//         getTodaysRequests({
//           filter: [
//             [
//               {
//                 field: "createdAt",
//                 operator: ">",
//                 value: currentTime,
//               },
//             ],
//           ],
//           count: true,
//         });
//         getTodaysCompanyErnings({
//           filter: [
//             [
//               {
//                 field: "paidAt",
//                 operator: ">",
//                 value: currentTime,
//               },
//             ],
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching current time:", error);
//       }
//     };

//     fetchTime();
//   }, []);

//   return (
//     <>
//       {" "}
//       <Row gutter={[8, 8]} justify={"space-between"} className="bg-gray-50">
//         <Col span={24}>
//           <Card
//             bordered={true}
//             title="Today"
//             headStyle={{ fontSize: "1.5rem" }}
//           >
//             <Row gutter={[16, 16]}>
//               <Card.Grid className="w-1/3 shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysEmployees.isFetching ||
//                     todaysEmployees.isLoading ||
//                     todaysEmployees.isUninitialized
//                   }
//                   title="Employees"
//                   value={todaysEmployees?.data?.count}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<WomanOutlined />}
//                 />
//               </Card.Grid>
//               <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysHiredEmployees.isFetching ||
//                     todaysHiredEmployees.isLoading ||
//                     todaysHiredEmployees.isUninitialized
//                   }
//                   title="Hired Employees"
//                   value={todaysHiredEmployees?.data?.distinctCount ?? 0}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<WomanOutlined />}
//                 />
//               </Card.Grid>
//               <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysEmployers?.isFetching ||
//                     todaysEmployers?.isLoading ||
//                     todaysEmployers.isUninitialized
//                   }
//                   title="Employers"
//                   value={todaysEmployers?.data?.count}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<SolutionOutlined />}
//                 />
//               </Card.Grid>
//               <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysJobs?.isFetching ||
//                     todaysJobs?.isLoading ||
//                     todaysJobs?.isUninitialized
//                   }
//                   title="Jobs Posted"
//                   value={todaysJobs?.data?.count}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<KeyOutlined />}
//                 />
//               </Card.Grid>
//               <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysRequests?.isFetching ||
//                     todaysRequests?.isLoading ||
//                     todaysRequests?.isUninitialized
//                   }
//                   title="Requests"
//                   value={todaysRequests?.data?.count}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<ApiOutlined />}
//                 />
//               </Card.Grid>
//               <Card.Grid className="w-1/3  shadow-lg hover:shadow-xl">
//                 <Statistic
//                   loading={
//                     todaysCompanyErnings?.isFetching ||
//                     todaysCompanyErnings?.isLoading ||
//                     todaysCompanyErnings?.isUninitialized
//                   }
//                   title="Incomes"
//                   value={todaysCompanyErnings?.data?.total}
//                   valueStyle={{ color: "#3f8600" }}
//                   prefix={<WalletOutlined />}
//                   suffix="ETB"
//                 />
//               </Card.Grid>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// }
export {};
