/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd/lib";
import { Activity } from "../../../models/activity.model";
import { Collection, CollectionQuery } from "../../../models/collection.model";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { ACTIVITY_LOG_ENDPOINT } from "../activity.endpoint";

const activityQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<Collection<Activity>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${ACTIVITY_LOG_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            //
          }
        } catch (error: any) {
          notification.error({
            message: "Error",
            description: error?.error?.data?.message
              ? error?.error?.data?.message
              : "Error try again",
          });
        }
      },
    }),
  }),
  overrideExisting: true,
});
export const { useLazyGetActivitiesQuery } = activityQuery;
