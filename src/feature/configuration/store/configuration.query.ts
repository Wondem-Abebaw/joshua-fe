/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { Collection, CollectionQuery } from "../../../models/collection.model";
import { Configuration } from "../../../models/configuration.model";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { CONFIGURATION_ENDPOINT } from "../configuration.endpoint";

let configurationCollection: CollectionQuery;
let archivedConfigurationCollection: CollectionQuery;

const configurationQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, string>({
      query: (id: string) => ({
        url: `${CONFIGURATION_ENDPOINT.detail}/${id}`,
        method: "get",
      }),
    }),

    getArchivedConfiguration: builder.query<Configuration, string>({
      query: (id: string) => ({
        url: `${CONFIGURATION_ENDPOINT.archivedConfiguration}/${id}`,
        method: "get",
      }),
    }),

    getArchivedConfigurations: builder.query<
      Collection<Configuration>,
      CollectionQuery
    >({
      query: (data: CollectionQuery) => ({
        url: `${CONFIGURATION_ENDPOINT.archivedList}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            archivedConfigurationCollection = param;
            console.log("param", archivedConfigurationCollection);
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

    getConfigurations: builder.query<
      Collection<Configuration>,
      CollectionQuery
    >({
      query: (data: CollectionQuery) => ({
        url: `${CONFIGURATION_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            configurationCollection = param;
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

    createConfiguration: builder.mutation<Configuration, Configuration>({
      query: (newData: any) => ({
        url: `${CONFIGURATION_ENDPOINT.create}`,
        method: "post",
        data: newData,
        permission: "manage-configurations",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully created",
            });
            dispatch(
              configurationQuery.util.updateQueryData(
                "getConfigurations",
                configurationCollection,
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

    updateConfiguration: builder.mutation<Configuration, Configuration>({
      query: (newData: any) => ({
        url: `${CONFIGURATION_ENDPOINT.update}`,
        method: "put",
        data: newData,
        permission: "manage-configurations",
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
              configurationQuery.util.updateQueryData(
                "getConfigurations",
                configurationCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((draftConfiguration) => {
                      if (draftConfiguration.id === data.id) return data;
                      else {
                        return draftConfiguration;
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

    archiveConfiguration: builder.mutation<
      Configuration,
      { id: string; reason: string }
    >({
      query: (data) => ({
        url: `${CONFIGURATION_ENDPOINT.archive}`,
        method: "delete",
        data: data,
        permission: "manage-configurations",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              configurationQuery.util.updateQueryData(
                "getConfigurations",
                configurationCollection,
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (draftConfiguration) => draftConfiguration.id !== arg.id
                  );
                  draft.count--;
                }
              )
            );
            dispatch(
              configurationQuery.util.updateQueryData(
                "getConfiguration",
                arg?.id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            dispatch(
              configurationQuery.util.updateQueryData(
                "getArchivedConfiguration",
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

    deleteConfiguration: builder.mutation<boolean, string>({
      query: (id: string) => ({
        url: `${CONFIGURATION_ENDPOINT.delete}/${id}`,
        method: "delete",
        permission: "manage-configurations",
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
              configurationQuery.util.updateQueryData(
                "getArchivedConfigurations",
                archivedConfigurationCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter(
                      (draftConfiguration) => draftConfiguration.id !== id
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

    restoreConfiguration: builder.mutation<Configuration, string>({
      query: (id: string) => ({
        url: `${CONFIGURATION_ENDPOINT.restore}/${id}`,
        method: "post",
        permission: "manage-configurations",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              configurationQuery.util.updateQueryData(
                "getConfigurations",
                configurationCollection,
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
              configurationQuery.util.updateQueryData(
                "getConfiguration",
                id,
                (draft) => {
                  draft.deletedAt = data?.deletedAt;
                }
              )
            );
            dispatch(
              configurationQuery.util.updateQueryData(
                "getArchivedConfiguration",
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
  useLazyGetConfigurationQuery,
  useLazyGetArchivedConfigurationQuery,
  useLazyGetConfigurationsQuery,
  useLazyGetArchivedConfigurationsQuery,
  useCreateConfigurationMutation,
  useUpdateConfigurationMutation,
  useArchiveConfigurationMutation,
  useRestoreConfigurationMutation,
  useDeleteConfigurationMutation,
} = configurationQuery;
