export const DASHBOARD_ENDPOINT = {
  // Employee
  groupEmployeesByStatus: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-status`,
  groupEmployeesByDeviceType: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-device-type`,
  groupEmployeesByAccountStatus: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-status`,
  groupEmployeesByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-created-date`,
  exportEmployees: `${import.meta.env.VITE_APP_API}/employees/export-employees`,
  groupEmployeesByJobCategory: `${
    import.meta.env.VITE_APP_API
  }/employees/group-hired-employees-by-category`,
  groupEmployeesByRating: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-rating`,
  groupEmployeesByTypeAndRating: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-type-and-rating`,
  groupEmployeesByLeaveReason: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employees-by-resignation-reason`,
  // job
  groupJobsByStatus: `${
    import.meta.env.VITE_APP_API
  }/jobs/group-jobs-by-status`,
  groupJobsByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/jobs/group-jobs-by-created-date`,
  groupJobsByCategory: `${
    import.meta.env.VITE_APP_API
  }/jobs/group-jobs-by-category`,
  groupJobsByCity: `${import.meta.env.VITE_APP_API}/jobs/group-jobs-by-city`,
  groupCandidatesByCategory: `${
    import.meta.env.VITE_APP_API
  }/jobs/group-candidates-by-category`,
  exportJobs: `${import.meta.env.VITE_APP_API}/jobs/export-jobs`,
  // Request
  groupRequetsByStatus: `${
    import.meta.env.VITE_APP_API
  }/requests/group-requests-by-status`,
  groupRequestsByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/requests/group-requests-by-created-date`,
  groupRequestsByServiceAndCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/requests/group-requests-by-service-and-created-date`,
  groupRequestsByEmploymentType: `${
    import.meta.env.VITE_APP_API
  }/requests/group-requests-by-employment-type`,
  // Employer
  groupEmployersByType: `${
    import.meta.env.VITE_APP_API
  }/employers/group-employers-by-type`,
  groupEmployersByDeviceType: `${
    import.meta.env.VITE_APP_API
  }/employers/group-employers-by-device-type`,
  groupEmployersByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/employers/group-employers-by-created-date`,
  countUnHiringEmployers: `${
    import.meta.env.VITE_APP_API
  }/employers/count-employers-with-no-hired-employees`,
  groupEmployersByHiringstatus: `${
    import.meta.env.VITE_APP_API
  }/employees/group-employers-that-hired-employees`,
  exportEmployers: `${import.meta.env.VITE_APP_API}/employers/export-employers`,
  exportEmployersByType: `${
    import.meta.env.VITE_APP_API
  }/employers/export-employers-with-hiring`,
  groupEmployersByLookingFor: `${
    import.meta.env.VITE_APP_API
  }/employers/group-employers-by-looking-for`,
  // Earnings
  earning: `${import.meta.env.VITE_APP_API}/payments/get-company-earning`,
  groupEarningsByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/payments/group-earning-by-created-date`,
  groupEmployeeEarningsByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/payments/group-earning-from-employees-by-date`,
  groupEmployerEarningsByCreatedDate: `${
    import.meta.env.VITE_APP_API
  }/payments/group-earning-from-employers-by-date`,
  get_date: `${import.meta.env.VITE_APP_API}/get-date`,
};
