/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd/lib";
import { Feedback } from "../../../models/feedback.model";
import { Collection, CollectionQuery } from "../../../models/collection.model";
import { collectionQueryBuilder } from "../../../shared/utility/collection-builder/collection-query-builder";
import { appApi } from "../../../store/app.api";
import { FEEDBACK_ENDPOINT } from "../feedback.endpoint";

let feedbackCollection: CollectionQuery;

const feedbackQuery = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query<Feedback, string>({
      query: (id: string) => ({
        url: `${FEEDBACK_ENDPOINT.detail}/${id}`,
        method: "get",
      }),
    }),

    getFeedbacks: builder.query<Collection<Feedback>, CollectionQuery>({
      query: (data: CollectionQuery) => ({
        url: `${FEEDBACK_ENDPOINT.list}`,
        method: "GET",
        params: collectionQueryBuilder(data),
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            feedbackCollection = param;
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

    deleteFeedback: builder.mutation<Feedback, string>({
      query: (id: string) => ({
        url: `${FEEDBACK_ENDPOINT.delete}/${id}`,
        method: "delete",
        permission: "manage-feedbacks",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              feedbackQuery.util.updateQueryData(
                "getFeedbacks",
                feedbackCollection,
                (draft) => {
                  draft.data = draft.data.filter(
                    (eachFeedback) => eachFeedback.id !== id
                  );
                  draft.count -= 1;
                }
              )
            );

            notification.success({
              message: "Success",
              description: "Successfully Deleted",
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
    reviewFeedback: builder.mutation<Feedback, string>({
      query: (data) => ({
        url: `${FEEDBACK_ENDPOINT.review}/${data}`,
        method: "post",
      }),
      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(
              feedbackQuery.util.updateQueryData(
                "getFeedbacks",
                feedbackCollection,
                (draft) => {
                  if (data) {
                    draft.data = draft?.data?.map((eachfeedback) => {
                      if (eachfeedback.id === data.id) return data;
                      else {
                        return eachfeedback;
                      }
                    });
                  }
                }
              )
            );

            notification.success({
              message: "Success",
              description: "Successfully Completed",
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
  useLazyGetFeedbacksQuery,
  useDeleteFeedbackMutation,
  useReviewFeedbackMutation,
} = feedbackQuery;
