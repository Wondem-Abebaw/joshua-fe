/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, CollectionQuery } from "../../../models/collection.model";
import { Permission } from "../../../models/permission.model";
import { Role } from "../../../models/role.model";
import { notification } from "antd";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { ROLE_ENDPOINT } from "../role.endpoint";

let rolePermissionCollection: any;
const roleQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Collection<Role>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${ROLE_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
        permission: "manage-roles",
      }),
    }),
    getPermissions: builder.query<Collection<Permission>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${ROLE_ENDPOINT.permission}`,
        method: "GET",
        params: collectionQueryBuilder(data),
        permission: "manage-permissions",
      }),
    }),
    getRolePermissions: builder.query<Collection<Permission>, any>({
      query: (data: { roleId: string; collection: CollectionQuery }) => ({
        url: `${ROLE_ENDPOINT.role_permissions}/${data.roleId}`,
        method: "GET",
        params: collectionQueryBuilder(data.collection),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          rolePermissionCollection = param;
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
    createRolePermissions: builder.mutation<Permission[], any>({
      query: (data: { roleId: string; permissions: string[] }) => ({
        url: `${ROLE_ENDPOINT.create_role_permissions}`,
        method: "POST",
        data: data,
        permission: "manage-permissions",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              roleQuery.util.updateQueryData(
                "getRolePermissions",
                rolePermissionCollection,
                (draft) => {
                  if (data) {
                    // Filter out elements from data array that are not already present in draft.data
                    const newData = data.filter(
                      (newItem) =>
                        !draft.data.some(
                          (existingItem) => existingItem.id === newItem.id
                        )
                    );
                    // Add only the filtered data to the beginning of draft.data
                    draft.data.unshift(...newData);
                    // Update count accordingly
                    draft.count += newData.length;
                  }
                }
              )
            );
            notification.success({
              message: "success",
              description: "Successfully assigned",
            });
          }
        } catch (error: any) {
          notification.error({
            message: "error",
            description: "Error try again",
          });
        }
      },
    }),
    removeRolePermissions: builder.mutation<any, any>({
      query: (data: { roleId: string; permissionId: string }) => ({
        url: `${ROLE_ENDPOINT.remove_role_permissions}`,
        method: "DELETE",
        data: data,
        permission: "manage-permissions",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              roleQuery.util.updateQueryData(
                "getRolePermissions",
                rolePermissionCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter(
                      (permission) => permission.id !== param.permissionId
                    );
                    draft.count -= 1;
                  }
                }
              )
            );
            notification.success({
              message: "success",
              description: "Successfully removed",
            });
          }
        } catch (error: any) {
          notification.error({
            message: "error",
            description: "error try again",
          });
        }
      },
    }),
  }),
  overrideExisting: true,
});
export const {
  useLazyGetRolesQuery,
  useLazyGetPermissionsQuery,
  useLazyGetRolePermissionsQuery,
  useCreateRolePermissionsMutation,
  useRemoveRolePermissionsMutation,
} = roleQuery;
