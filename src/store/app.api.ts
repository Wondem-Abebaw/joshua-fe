import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/utility/axios-base-query";

// initialize an empty api service that we'll inject endpoints into later as needed
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [],
});
