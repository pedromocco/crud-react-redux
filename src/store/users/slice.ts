import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    github: "alicesmith",
  },
  {
    id: "2",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    github: "bobjohnson",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    github: "carolwilliams",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@example.com",
    github: "davidbrown",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve.davis@example.com",
    github: "evedavis",
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistanceState = localStorage.getItem("__redux__state__");
  return persistanceState ? JSON.parse(persistanceState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = (state.length + 1).toString()
      state.push({ id, ...action.payload });
    },
    deleteUserById: (state, action) => {
      const id = action.payload;
      return state.filter((user) => user.id != id);
    },
    editUserById: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<User> }>
    ) => {
      const { id, updates } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state[userIndex] = { ...state[userIndex], ...updates };
      }
    },

    rollbackUser: (state, action) => {
      const userExist = state.some((user) => user.id === action.payload.id);
      if (!userExist) {
        state.push(action.payload);
      }
    },
  },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserById, editUserById } = usersSlice.actions;
