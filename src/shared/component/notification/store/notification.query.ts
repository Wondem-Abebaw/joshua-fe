/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { NOTIFICATION_ENDPOINT } from "../notification.endpoint";
import {
  Collection,
  CollectionQuery,
} from "../../../../models/collection.model";
import { appApi } from "../../../../store/app.api";
import { collectionQueryBuilder } from "../../../utility/collection-builder/collection-query-builder";
import { Notification } from "../../../../models/notification.model";

let notificationCollection: CollectionQuery;
let archivedNotificationCollection: CollectionQuery;

const notificationQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<Notification, string>({
      query: (id: string) => ({
        url: `${NOTIFICATION_ENDPOINT.detail}/${id}`,
        method: "get",
      }),
    }),

    getArchivedNotification: builder.query<Notification, string>({
      query: (id: string) => ({
        url: `${NOTIFICATION_ENDPOINT.archivedNotification}/${id}`,
        method: "get",
      }),
    }),

    getArchivedNotifications: builder.query<
      Collection<Notification>,
      CollectionQuery
    >({
      query: (data: CollectionQuery) => ({
        url: `${NOTIFICATION_ENDPOINT.archivedList}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            archivedNotificationCollection = param;
            console.log("param", archivedNotificationCollection);
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

    getNotifications: builder.query<Collection<Notification>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${NOTIFICATION_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notificationCollection = param;
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

    createNotification: builder.mutation<Notification, Notification>({
      query: (newData: any) => ({
        url: `${NOTIFICATION_ENDPOINT.create}`,
        method: "post",
        data: newData,
        permissions: "manage-notifications",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully Sent",
            });
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotifications",
                notificationCollection,
                (draft) => {
                  if (data) {
                    draft.data.unshift(data);
                    draft.count += 1;
                  }
                }
              )
            );
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

    updateNotification: builder.mutation<Notification, Notification>({
      query: (newData: any) => ({
        url: `${NOTIFICATION_ENDPOINT.update}`,
        method: "put",
        data: newData,
        permission: "manage-notifications",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully updated",
            });
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotifications",
                notificationCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((draftNotification) => {
                      if (draftNotification.id === data.id) return data;
                      else {
                        return draftNotification;
                      }
                    });
                  }
                }
              )
            );
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

    activateNotification: builder.mutation<Notification, string>({
      query: (id: string) => ({
        url: `${NOTIFICATION_ENDPOINT.toggleStatus}/${id}`,
        method: "post",
        permission: "activate-or-block-Notifications",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully updated status",
            });
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotifications",
                notificationCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((draftNotification) => {
                      if (draftNotification.id === data.id) return data;
                      else {
                        return draftNotification;
                      }
                    });
                  }
                }
              )
            );
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotification",
                param,
                (draft) => {
                  draft.status = data.status;
                }
              )
            );
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

    archiveNotification: builder.mutation<
      Notification,
      { id: string; reason: string }
    >({
      query: (data) => ({
        url: `${NOTIFICATION_ENDPOINT.archive}`,
        method: "delete",
        data: data,
        permission: "manage-Notifications",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotifications",
                notificationCollection,
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (draftNotification) => draftNotification.id !== arg.id
                  );
                  draft.count--;
                }
              )
            );
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotification",
                arg?.id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            dispatch(
              notificationQuery.util.updateQueryData(
                "getArchivedNotification",
                arg?.id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            notification.success({
              message: "Success",
              description: "Successfully archived",
            });
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

    deleteNotification: builder.mutation<boolean, string>({
      query: (id: string) => ({
        url: `${NOTIFICATION_ENDPOINT.delete}/${id}`,
        method: "delete",
        permission: "manage-Notifications",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully deleted",
            });
            dispatch(
              notificationQuery.util.updateQueryData(
                "getArchivedNotifications",
                archivedNotificationCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter(
                      (draftNotification) => draftNotification.id !== id
                    );
                    draft.count -= 1;
                  }
                }
              )
            );
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

    restoreNotification: builder.mutation<Notification, string>({
      query: (id: string) => ({
        url: `${NOTIFICATION_ENDPOINT.restore}/${id}`,
        method: "post",
        permission: "manage-Notifications",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotifications",
                notificationCollection,
                (draft) => {
                  draft.data = draft?.data?.map((provider) => {
                    if (provider.id === id) {
                      return data;
                    } else {
                      return provider;
                    }
                  });
                }
              )
            );
            dispatch(
              notificationQuery.util.updateQueryData(
                "getNotification",
                id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            dispatch(
              notificationQuery.util.updateQueryData(
                "getArchivedNotification",
                id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            notification.success({
              message: "Success",
              description: "Successfully restored",
            });
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
export const {
  useLazyGetNotificationQuery,
  useLazyGetArchivedNotificationQuery,
  useLazyGetNotificationsQuery,
  useLazyGetArchivedNotificationsQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useArchiveNotificationMutation,
  useActivateNotificationMutation,
  useRestoreNotificationMutation,
  useDeleteNotificationMutation,
} = notificationQuery;
