import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from "./app.api";
import authReducer from "../shared/auth/auth-slice/auth-slice";
import localeReducer from "../shared/store/slice/locale/locale-slice";
import entityListReducer from "../shared/store/slice/entity-list/entity-list-slice";
import themeReducer from "../shared/store/slice/theme-slice/theme-slice";
export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    localeReducer,
    entityListReducer,
    authReducer,
    themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
