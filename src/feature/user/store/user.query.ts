/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { Collection, CollectionQuery } from "../../../models/collection.model";
import { User } from "../../../models/user.model";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { USER_ENDPOINT } from "../user.endpoint";
import { Role } from "../../../models/role.model";
import { Permission } from "../../../models/permission.model";

let userCollection: CollectionQuery;
let archivedUserCollection: CollectionQuery;
let rolePermissionsListCollection: any;
const userQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.detail}/${id}`,
        method: "get",
      }),
    }),

    getArchivedUser: builder.query<User, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.archivedUser}/${id}`,
        method: "get",
      }),
    }),

    getArchivedUsers: builder.query<Collection<User>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${USER_ENDPOINT.archivedUser}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            archivedUserCollection = param;
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

    getUsers: builder.query<Collection<User>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${USER_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            userCollection = param;
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
    getRoles: builder.query<Collection<Role>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${USER_ENDPOINT.roles}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          //
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
    getUserRoles: builder.query<Collection<Role>, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.user_role}/${id}`,
        method: "GET",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          //
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

    createUser: builder.mutation<User, User>({
      query: (newData: any) => ({
        url: `${USER_ENDPOINT.create}`,
        method: "post",
        data: newData,
        permission: "manage-users",
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
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
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

    updateUser: builder.mutation<User, User>({
      query: (newData: any) => ({
        url: `${USER_ENDPOINT.update}`,
        method: "put",
        data: newData,
        permission: "manage-users",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully updated ",
            });
            dispatch(
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((user) => {
                      if (user.id === data.id) return data;
                      else {
                        return user;
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

    updateUserProfile: builder.mutation<User, any>({
      query: (newData: any) => ({
        url: `${USER_ENDPOINT.updateProfile}` + newData.id,
        method: "post",
        data: newData.data,
        permission: "manage-users",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully updated ",
            });
            dispatch(
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((user) => {
                      if (user.id === data.id) return data;
                      else {
                        return user;
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

    activateUser: builder.mutation<User, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.toggleStatus}/${id}`,
        method: "post",
        permission: "activate-or-block-users",
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
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((user) => {
                      if (user.id === data.id) return data;
                      else {
                        return user;
                      }
                    });
                  }
                }
              )
            );
            dispatch(
              userQuery.util.updateQueryData("getUser", param, (draft) => {
                draft.enabled = data.enabled;
              })
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

    archiveUser: builder.mutation<User, { id: string; reason: string }>({
      query: (data) => ({
        url: `${USER_ENDPOINT.archive}`,
        method: "delete",
        data: data,
        permission: "manage-users",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
                (draft) => {
                  draft.data = draft?.data?.map((provider) => {
                    if (provider.id === arg.id) {
                      return data;
                    } else {
                      return provider;
                    }
                  });
                }
              )
            );
            dispatch(
              userQuery.util.updateQueryData("getUser", arg?.id, (draft) => {
                draft.deletedAt = data?.deletedAt;
              })
            );
            dispatch(
              userQuery.util.updateQueryData(
                "getArchivedUser",
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

    deleteUser: builder.mutation<boolean, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.delete}/${id}`,
        method: "delete",
        permission: "manage-users",
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
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter((user) => user.id !== id);
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

    restoreUser: builder.mutation<User, string>({
      query: (id: string) => ({
        url: `${USER_ENDPOINT.restore}/${id}`,
        method: "post",
        permission: "manage-users",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userQuery.util.updateQueryData(
                "getUsers",
                userCollection,
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
              userQuery.util.updateQueryData("getUser", id, (draft) => {
                draft.deletedAt = data?.deletedAt;
              })
            );
            dispatch(
              userQuery.util.updateQueryData("getArchivedUser", id, (draft) => {
                draft.deletedAt = data?.deletedAt;
              })
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
    getRolePermissionsList: builder.query<Collection<Permission>, any>({
      query: (data: { roleId: string; collection: CollectionQuery }) => ({
        url: `${USER_ENDPOINT.role_permissions_list}/${data.roleId}`,
        method: "GET",
        params: collectionQueryBuilder(data.collection),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          rolePermissionsListCollection = param;
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
    getUserRolePermissions: builder.query<Permission[], any>({
      query: (data: { roleId: string; accountId: string }) => ({
        url: `${USER_ENDPOINT.user_role_permissions}/${data.accountId}/${data.roleId}`,
        method: "GET",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          //
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
    addRoleToAccount: builder.mutation<Role[], any>({
      query: (data: any) => ({
        url: `${USER_ENDPOINT.add_account_role}`,
        method: "post",
        data: data,
        permission: "manage-account-roles",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userQuery.util.updateQueryData(
                "getUserRoles",
                param.accountId,
                (draft) => {
                  if (data) {
                    const combinedArray = [...data, ...draft?.data];
                    const uniqueIds = new Set();
                    const uniqueArray = combinedArray.filter((obj) => {
                      if (!uniqueIds.has(obj.id)) {
                        uniqueIds.add(obj.id);
                        return true;
                      }
                      return false;
                    });
                    draft.data = uniqueArray;
                    draft.count += data.length;
                  }
                }
              )
            );
            notification.success({
              message: "Success",
              description: "Successfully assigned",
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
    addAccountRolePermissions: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${USER_ENDPOINT.add_account_role_permission}`,
        method: "post",
        data: data,
        permission: "manage-account-permissions",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              userQuery.util.updateQueryData(
                "getUserRolePermissions",
                { roleId: param.roleId, accountId: param.accountId },
                (draft) => {
                  if (data) {
                    draft = draft.concat(data);
                  }
                }
              )
            );
            notification.success({
              message: "Success",
              description: "Permission Successfully assigned",
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
    removeAccountRole: builder.mutation<any, any>({
      query: (data: { roleId: string; accountId: string }) => ({
        url: `${USER_ENDPOINT.remove_account_role}`,
        method: "DELETE",
        data: data,
        permission: "manage-account-roles",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(
              userQuery.util.updateQueryData(
                "getUserRoles",
                param.accountId,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter(
                      (role) => role?.id !== param?.roleId
                    );
                    draft.count -= 1;
                  }
                }
              )
            );

            {
              rolePermissionsListCollection.roleId === param.roleId &&
                dispatch(
                  userQuery.util.updateQueryData(
                    "getRolePermissionsList",
                    rolePermissionsListCollection,
                    (draft) => {
                      const emptyData: any[] = [];
                      draft.data = emptyData;
                      draft.data.length = 0;
                    }
                  )
                );
            }

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
    resetUserPassword: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `${USER_ENDPOINT.reset_user_password}`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          notification.success({
            message: "success",
            description: "Password reseted successfully",
          });
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
  useLazyGetUserQuery,
  useLazyGetArchivedUserQuery,
  useLazyGetUsersQuery,
  useLazyGetArchivedUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useArchiveUserMutation,
  useActivateUserMutation,
  useRestoreUserMutation,
  useDeleteUserMutation,
  useLazyGetRolesQuery,
  useLazyGetUserRolesQuery,
  useLazyGetRolePermissionsListQuery,
  useAddRoleToAccountMutation,
  useLazyGetUserRolePermissionsQuery,
  useAddAccountRolePermissionsMutation,
  useRemoveAccountRoleMutation,
  useResetUserPasswordMutation,
} = userQuery;
