/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionQuery } from "../../../models/collection.model";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { DASHBOARD_ENDPOINT } from "../dashboard.endpoint";

const dashboardQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    groupEmployeesByStatus: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByStatus}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupEmployeesByDeviceType: builder.query<any, void>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByDeviceType}`,
        method: "GET",
      }),
    }),
    groupEmployeesByAccountStatus: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByAccountStatus}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupEmployeesByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupEmployeesByCategory: builder.query<any, string>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByJobCategory}`,
        method: "GET",
      }),
    }),
    groupCandidatesByCategory: builder.query<any, void>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupCandidatesByCategory}`,
        method: "GET",
      }),
    }),
    groupEmployeesByRating: builder.query<any, any>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByRating}`,
        method: "GET",
      }),
    }),
    groupEmployeesByLeaveReason: builder.query<any, any>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByLeaveReason}`,
        method: "GET",
      }),
    }),
    groupEmployeesByTypeAndRating: builder.query<any, any>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeesByTypeAndRating}`,
        method: "GET",
      }),
    }),
    exportEmployees: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.exportEmployees}?${collectionQueryBuilder(
          data
        )}`,
        method: "GET",
        responseType: "arraybuffer",
      }),
    }),
    // Job
    groupJobsByStatus: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupJobsByStatus}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupJobsByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupJobsByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupJobsByCategory: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupJobsByCategory}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupJobsByCity: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupJobsByCity}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    exportJobs: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.exportJobs}?${collectionQueryBuilder(data)}`,
        method: "GET",
        responseType: "arraybuffer",
      }),
    }),
    // request
    groupRequestsByStatus: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupRequetsByStatus}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupRequestsByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupRequestsByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupRequestsByServiceAndCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupRequestsByServiceAndCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupRequestsByEmploymentType: builder.query<any, string>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupRequestsByEmploymentType}`,
        method: "GET",
      }),
    }),
    groupEmployersByType: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployersByType}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupEmployeresByDeviceType: builder.query<any, void>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployersByDeviceType}`,
        method: "GET",
      }),
    }),
    groupEmployersByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployersByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    countUnHiringEmployers: builder.query<any, string>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.countUnHiringEmployers}`,
        method: "GET",
      }),
    }),
    groupEmployersByHiringstatus: builder.query<any, string>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployersByHiringstatus}`,
        method: "GET",
      }),
    }),
    exportEmployers: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.exportEmployers}?${collectionQueryBuilder(
          data
        )}`,
        method: "GET",
        responseType: "arraybuffer",
      }),
    }),
    exportEmployersByType: builder.query<
      any,
      { collections: CollectionQuery; type: string }
    >({
      query: (data) => ({
        url: `${DASHBOARD_ENDPOINT.exportEmployersByType}/${
          data.type
        }?${collectionQueryBuilder(data.collections)}`,
        method: "GET",
        responseType: "arraybuffer",
      }),
    }),
    groupEmployersByLookingFor: builder.query<any, string>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployersByLookingFor}`,
        method: "GET",
      }),
    }),
    // Earnings
    getCompanyEarnings: builder.query<any, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${DASHBOARD_ENDPOINT.earning}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
    }),
    groupEarningsByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupEarningsByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupEmployeeEarningsByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployeeEarningsByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    groupEmployerEarningsByCreatedDate: builder.query<any, string>({
      query: (format: string) => ({
        url: `${DASHBOARD_ENDPOINT.groupEmployerEarningsByCreatedDate}/${format}`,
        method: "GET",
      }),
    }),
    getDate: builder.query<any, void>({
      query: () => ({
        url: `${DASHBOARD_ENDPOINT.get_date}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});
export const {
  useLazyGetCompanyEarningsQuery,
  useLazyGroupEmployeesByStatusQuery,
  useLazyGroupEmployeesByDeviceTypeQuery,
  useLazyGroupEmployeresByDeviceTypeQuery,
  useLazyGroupEmployeesByAccountStatusQuery,
  useLazyGroupEmployeesByCreatedDateQuery,
  useLazyGroupEmployeesByRatingQuery,
  useLazyGroupEmployeesByTypeAndRatingQuery,
  useLazyGroupEmployeesByLeaveReasonQuery,
  useLazyExportEmployeesQuery,
  useLazyGroupEmployeesByCategoryQuery,
  useLazyGroupJobsByStatusQuery,
  useLazyGroupJobsByCreatedDateQuery,
  useLazyGroupJobsByCategoryQuery,
  useLazyGroupJobsByCityQuery,
  useLazyExportJobsQuery,
  useLazyGroupRequestsByCreatedDateQuery,
  useLazyGroupRequestsByStatusQuery,
  useLazyGroupRequestsByEmploymentTypeQuery,
  useLazyGroupEmployersByTypeQuery,
  useLazyGroupEmployersByCreatedDateQuery,
  useLazyExportEmployersQuery,
  useLazyCountUnHiringEmployersQuery,
  useLazyGroupEarningsByCreatedDateQuery,
  useLazyGroupEmployeeEarningsByCreatedDateQuery,
  useLazyGroupEmployerEarningsByCreatedDateQuery,
  useLazyGroupRequestsByServiceAndCreatedDateQuery,
  useLazyGroupEmployersByHiringstatusQuery,
  useLazyExportEmployersByTypeQuery,
  useLazyGroupEmployersByLookingForQuery,
  useLazyGetDateQuery,
  useLazyGroupCandidatesByCategoryQuery,
} = dashboardQuery;
