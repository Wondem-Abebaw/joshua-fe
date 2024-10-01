/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import { Collection, CollectionQuery } from "../../../models/collection.model";

import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { ROOM_ENDPOINT } from "../room.endpoint";
import { Room } from "../../../models/room.model";

let roomCollection: CollectionQuery;
let archivedRoomCollection: CollectionQuery;

const roomQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoom: builder.query<Room, string>({
      query: (id: string) => ({
        url: `${ROOM_ENDPOINT.detail}/${id}`,
        method: "get",
      }),
    }),

    getArchivedRoom: builder.query<Room, string>({
      query: (id: string) => ({
        url: `${ROOM_ENDPOINT.archivedRoom}/${id}`,
        method: "get",
      }),
    }),

    getArchivedRooms: builder.query<Collection<Room>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${ROOM_ENDPOINT.archivedList}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            archivedRoomCollection = param;
            console.log("param", archivedRoomCollection);
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

    getRooms: builder.query<Collection<Room>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${ROOM_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            roomCollection = param;
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

    createRoom: builder.mutation<Room, Room>({
      query: (newData: any) => ({
        url: `${ROOM_ENDPOINT.create}`,
        method: "post",
        data: newData,
        permission: "manage-rooms",
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
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
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

    updateRoom: builder.mutation<Room, Room>({
      query: (newData: any) => ({
        url: `${ROOM_ENDPOINT.update}`,
        method: "put",
        data: newData,
        permission: "manage-rooms",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("data", data)
          // console.log("querfu", queryFulfilled)
          // console.log("param", param)
          if (data) {
            notification.success({
              message: "Success",
              description: "Successfully updated",
            });
            dispatch(
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
                (draft) => {
                  // Object.assign(draft, data)
                  // console.log("draft", JSON.stringify(draft))
                  if (data) {
                    draft.data = draft?.data?.map((draftRoom) => {
                      if (draftRoom.id === data.id) return data;
                      else {
                        return draftRoom;
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

    activateRoom: builder.mutation<Room, string>({
      query: (id: string) => ({
        url: `${ROOM_ENDPOINT.toggleStatus}/${id}`,
        method: "post",
        permission: "activate-or-block-rooms",
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
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((draftRoom) => {
                      if (draftRoom.id === data.id) return data;
                      else {
                        return draftRoom;
                      }
                    });
                  }
                }
              )
            );
            dispatch(
              roomQuery.util.updateQueryData("getRoom", param, (draft) => {
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

    archiveRoom: builder.mutation<Room, { id: string; reason: string }>({
      query: (data) => ({
        url: `${ROOM_ENDPOINT.archive}`,
        method: "delete",
        data: data,
        permission: "manage-rooms",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
                (draft) => {
                  draft.data = draft?.data?.filter(
                    (draftRoom) => draftRoom.id !== arg.id
                  );
                  draft.count--;
                }
              )
            );
            dispatch(
              roomQuery.util.updateQueryData("getRoom", arg?.id, (draft) => {
                draft.deletedAt = data?.deletedAt;
              })
            );
            dispatch(
              roomQuery.util.updateQueryData(
                "getArchivedRoom",
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

    deleteRoom: builder.mutation<boolean, string>({
      query: (id: string) => ({
        url: `${ROOM_ENDPOINT.delete}/${id}`,
        method: "delete",
        permission: "manage-rooms",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft.data.filter(
                      (draftRoom) => draftRoom.id !== id
                    );
                    draft.count -= 1;
                  }
                }
              )
            );
            notification.success({
              message: "Success",
              description: "Successfully deleted",
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

    restoreRoom: builder.mutation<Room, string>({
      query: (id: string) => ({
        url: `${ROOM_ENDPOINT.restore}/${id}`,
        method: "post",
        permission: "manage-rooms",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              roomQuery.util.updateQueryData(
                "getRooms",
                roomCollection,
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
              roomQuery.util.updateQueryData("getRoom", id, (draft) => {
                draft.deletedAt = data?.deletedAt;
              })
            );
            dispatch(
              roomQuery.util.updateQueryData("getArchivedRoom", id, (draft) => {
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
  }),
  overrideExisting: true,
});
export const {
  useLazyGetRoomQuery,
  useLazyGetArchivedRoomQuery,
  useLazyGetRoomsQuery,
  useLazyGetArchivedRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useArchiveRoomMutation,
  useActivateRoomMutation,
  useRestoreRoomMutation,
  useDeleteRoomMutation,
} = roomQuery;
