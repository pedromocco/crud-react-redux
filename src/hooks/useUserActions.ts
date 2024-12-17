import { addNewUser, deleteUserById, editUserById, UserId, User } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addUser = ({ name, email, github }) => {
    dispatch(addNewUser({ name, email, github }));
  };

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  const editUser = (id: UserId, updates: User) => {
    dispatch(editUserById({ id, updates}))
  };

  return { removeUser, addUser, editUser };
};
