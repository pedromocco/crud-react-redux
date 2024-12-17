// @ts-ignore: Unused variable
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
  (store: any) => (next: any) => (action: any) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

const syncWithDatabase: Middleware =
  (store: any) => (next: any) => (action: any) => {
    const { type, payload } = action;
    console.log(payload)

    next(action);

    if (type === "users/deleteUserById") {
      toast.warning(`User ${payload} deleted`);
    }
    if (type === "users/addNewUser") {
      toast.success(`User added`);
    }
    if (type === "users/editUserById") {
      toast.success(`User modified`);
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware,
      syncWithDatabase
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
